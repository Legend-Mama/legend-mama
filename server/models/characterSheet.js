/*
CharacterSheet object and converter to use with Firebase

How to use with Firestore:
Set Custom Object
const ref = doc(db, "accounts", "user").withConverter(characterSheetConverter);
await setDoc(ref, new CharacterSheet("Eustace Twinkletoes", "Dwarf"));

Get Custom Object
const ref = doc(db, "accounts", "user").withConverter(characterSheetConverter);
const docSnap = await getDoc(ref);
if (docSnap.exists()) {
  // Convert to CharacterSheet object
  const characterSheet = docSnap.data();
  // Use a CharacterSheet instance method
  console.log(characterSheet.toString());
} else {
  console.log("No such document!");
}

Reference: https://firebase.google.com/docs/firestore/manage-data/add-data#custom_objects
 */
import classes from '../data/dnd5e/classes.json' with {type: 'json'};
import races from '../data/dnd5e/races.json' with {type: 'json'};
import tools from '../data/dnd5e/tools.json' with {type: 'json'};
import weapons from '../data/dnd5e/weapons.json' with {type: 'json'};
import selectionValidation from "../helpers/selectionValidation.js";
import pointBuyValidation from "../helpers/pointBuyValidation.js";

export class RaceDetails {
    constructor(name) {
        this.name = name;
        const data = races[name];
        this.description = data.description;
        this.racialStatBonus = data.racialStatBonus;
        this.hpBonus = data.hpBonus;
        this.speed = data.speed;
        this.weaponProficiency = data.weaponProficiency.map(obj => weapons[obj] || obj).flat();
        this.armorProficiency = data.armorProficiency;
        this.toolProficiency = data.toolProficiency.map(obj => tools[obj] || obj).flat();
        this.skillProficiency = data.skillProficiency;
        this.languages = data.languages;
        this.features = data.features;
    }
}

export class ClassDetails {
    constructor(name) {
        this.name = name;
        const data = classes[name];
        this.description = data.description;
        this.hitDice = data.hitDice;
        this.unarmoredACBonus = data.unarmoredACBonus;
        this.armorProficiency = data.armorProficiency;
        this.weaponProficiency = data.weaponProficiency.map(obj => weapons[obj] || obj).flat();
        this.toolProficiency = data.toolProficiency;
        this.skillProficiency = data.skillProficiency;
        this.savingThrowProficiency = data.savingThrowProficiency;
        this.languages = data.languages;
        this.features = data.features;
    }
}

export class Background {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;

        if (data.skillProficiency.length !== 2) {
            throw new Error('Requires 2 skill proficiencies');
        }
        this.skillProficiency = data.skillProficiency;

        if ((data.toolProficiency.length + data.languages.length) > 2) {
            throw new Error('Choose a total of 2 tool proficiencies or languages');
        }
        this.toolProficiency = data.toolProficiency;
        this.languages = data.languages;

        this.feature = data.feature;
    }
}

export class CharacterSheet {
    level = 1;
    proficiencyBonus = 2;
    constructor (data) {

        // Pass values through
        this.name = data.name;
        this.background = data.background;
        this.alignment = data.alignment;
        this.personalityTraits = data.personalityTraits;
        this.ideal = data.ideal;
        this.bond = data.bond;
        this.flaw = data.flaw;
        this.backstory = data.backstory;

        // Get race, class, and ability score details
        this.race = data.race;
        this.class = data.class;
        this.abilityScores = this.getAbilityScores(data.abilityScores, data.racialStatBonus, this.race.racialStatBonus);

        // Get derived fields
        this.abilityModifiers = this.getAbilityModifiers();
        this.savingThrowProficiency = this.class.savingThrowProficiency;
        this.savingThrows = this.getSavingThrows();
        this.armorClass = 10 + this.abilityModifiers.dexterity;
        if (this.class.unarmoredACBonus.length > 0) {
            this.armorClass += this.abilityModifiers[this.class.unarmoredACBonus];
        }

        this.initiative = this.abilityModifiers.dexterity;
        this.speed = this.race.speed;
        this.hitDice = this.class.hitDice;
        this.hitPointMax = this.hitDice + this.abilityModifiers.constitution + this.race.hpBonus;
        this.passivePerception = 10 + this.abilityModifiers.wisdom;

        // Consolidate across race, class, and background
        this.weaponProficiency = Array.from(new Set([...this.race.weaponProficiency, ...this.class.weaponProficiency]));
        this.armorProficiency = Array.from(new Set([...this.race.armorProficiency, ...this.class.armorProficiency]));
        this.features = Array.from(new Set([...this.race.features, ...this.class.features, this.background.feature.name]));

        // Check skill proficiency, tool proficiency, and language selections
        this.skillProficiency = this.checkSkillProficiencies(data.skillProficiency);
        this.toolProficiency = this.checkToolProficiencies(data.toolProficiency);
        this.languages = this.checkLanguages(data.languages);

        this.skills = this.getSkills();
    }

    getAbilityScores(baseScores, bonusSelection, bonusOptions) {
        baseScores = pointBuyValidation(baseScores);
        bonusSelection = selectionValidation(bonusSelection, bonusOptions);
        const bonuses = {strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0};

        let tmp;
        for (let bonus of bonusSelection) {
            tmp = bonus.split(",");
            bonuses[tmp[0]] = parseInt(tmp[1]);
        }

        return {
            strength: baseScores.strength + bonuses.strength,
            dexterity: baseScores.dexterity + bonuses.dexterity,
            constitution: baseScores.constitution + bonuses.constitution,
            intelligence: baseScores.intelligence + bonuses.intelligence,
            wisdom: baseScores.wisdom + bonuses.wisdom,
            charisma: baseScores.charisma + bonuses.charisma,
        }
    }

    getAbilityModifiers() {
        const score2modifier = (score) => {
            return Math.floor((score - 10)/2)
        }
        return {
            strength: score2modifier(this.abilityScores.strength),
            dexterity: score2modifier(this.abilityScores.dexterity),
            constitution: score2modifier(this.abilityScores.constitution),
            intelligence: score2modifier(this.abilityScores.intelligence),
            wisdom: score2modifier(this.abilityScores.wisdom),
            charisma: score2modifier(this.abilityScores.charisma)
        }
    }

    getSavingThrows() {
        const savingThrows = {
            strength: this.abilityModifiers.strength,
            dexterity: this.abilityModifiers.dexterity,
            constitution: this.abilityModifiers.constitution,
            intelligence: this.abilityModifiers.intelligence,
            wisdom: this.abilityModifiers.wisdom,
            charisma: this.abilityModifiers.charisma,
        };

        for (let ability of this.savingThrowProficiency) {
            savingThrows[ability] += this.proficiencyBonus;
        }

        return savingThrows;
    }

    checkSkillProficiencies(skillProficiency) {
        const skillProficiencyOptions = Array.from(new Set([...this.race.skillProficiency, ...this.class.skillProficiency, ...this.background.skillProficiency]));
        return selectionValidation(skillProficiency, skillProficiencyOptions);
    }

    checkToolProficiencies(toolProficiency) {
        const toolProficiencyOptions = Array.from(new Set([...this.race.toolProficiency, ...this.class.toolProficiency, ...this.background.toolProficiency]));
        return selectionValidation(toolProficiency, toolProficiencyOptions);
    }

    checkLanguages(languages) {
        const languageOptions = Array.from(new Set([...this.race.languages, ...this.class.languages, ...this.background.languages]));
        return selectionValidation(languages, languageOptions);
    }

    getSkills() {
        const skills = {
            "Athletics": this.abilityModifiers.strength,
            "Acrobatics": this.abilityModifiers.dexterity,
            "Sleight of Hand": this.abilityModifiers.dexterity,
            "Stealth": this.abilityModifiers.dexterity,
            "Arcana": this.abilityModifiers.intelligence,
            "History": this.abilityModifiers.intelligence,
            "Investigation": this.abilityModifiers.intelligence,
            "Nature": this.abilityModifiers.intelligence,
            "Religion": this.abilityModifiers.intelligence,
            "Animal Handling": this.abilityModifiers.wisdom,
            "Insight": this.abilityModifiers.wisdom,
            "Medicine": this.abilityModifiers.wisdom,
            "Perception": this.abilityModifiers.wisdom,
            "Survival": this.abilityModifiers.wisdom,
            "Deception": this.abilityModifiers.charisma,
            "Intimidation": this.abilityModifiers.charisma,
            "Performance": this.abilityModifiers.charisma,
            "Persuasion": this.abilityModifiers.charisma
        };

        for (let skill of this.skillProficiency) {
            skills[skill] += this.proficiencyBonus;
        }

        return skills;
    }

    toJSON() {
        return {
            name: this.name,
            race: this.race.name,
            class: this.class.name,
            level: this.level,
            background: {name: this.background.name, description: this.background.description, feature: this.background.feature},
            alignment: this.alignment,
            abilityScores: this.abilityScores,
            abilityModifiers: this.abilityModifiers,
            armorClass: this.armorClass,
            initiative: this.initiative,
            speed: this.speed,
            hitDice: this.hitDice,
            hitPointMax: this.hitPointMax,
            proficiencyBonus: this.proficiencyBonus,
            passivePerception: this.passivePerception,
            savingThrowProficiency: this.savingThrowProficiency,
            savingThrows: this.savingThrows,
            skillProficiency: this.skillProficiency,
            skills: this.skills,
            weaponProficiency: this.weaponProficiency,
            armorProficiency: this.armorProficiency,
            toolProficiency: this.toolProficiency,
            languages: this.languages,
            feature: this.features,
            personalityTraits: this.personalityTraits,
            ideal: this.ideal,
            bond: this.bond,
            flaw: this.flaw,
            backstory: this.backstory
        };
    }

    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        this.constructor(data);
    }
}
