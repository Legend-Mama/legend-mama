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
    constructor(name, description, skillProficiency, toolProficiency, languages, feature) {
        this.name = name;
        this.description = description;

        if (skillProficiency.length !== 2) {
            throw new Error('Requires 2 skill proficiencies');
        }
        this.skillProficiency = skillProficiency;

        if ((toolProficiency.length + languages.length) > 2) {
            throw new Error('Choose a total of 2 tool proficiencies or languages');
        }
        this.toolProficiency = toolProficiency;
        this.languages = languages;

        this.feature = feature;
    }
}

export class AbilityScores {
    bonuses = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    };

    constructor(baseScores, racialStatBonus) {
        this.baseScores = pointBuyValidation(baseScores);

        const bonuses = selectionValidation(racialStatBonus.selection, racialStatBonus.options);
        let tmp;
        for (let bonus of bonuses) {
            tmp = bonus.split(",");
            this.bonuses[tmp[0]] = parseInt(tmp[1]);
        }
    }

    getAbilityScores() {
        return {
            strength: this.baseScores.strength + this.bonuses.strength,
            dexterity: this.baseScores.dexterity + this.bonuses.dexterity,
            constitution: this.baseScores.constitution + this.bonuses.constitution,
            intelligence: this.baseScores.intelligence + this.bonuses.intelligence,
            wisdom: this.baseScores.wisdom + this.bonuses.wisdom,
            charisma: this.baseScores.charisma + this.bonuses.charisma,
        }
    }
}

export class CharacterSheet {
    level = 1;
    proficiencyBonus = 2;
    constructor (name, race, charClass, background, alignment, abilityScores, racialStatBonus, skillProficiency,
                 toolProficiency, languages, personalityTraits, ideal, bond, flaw, backstory) {

        // Pass values through
        this.name = name;
        this.background = background;
        this.alignment = alignment;
        this.personalityTraits = personalityTraits;
        this.ideal = ideal;
        this.bond = bond;
        this.flaw = flaw;
        this.backstory = backstory;

        // Get race, class, and ability score details
        this.race = RaceDetails.constructor(race);
        this.class = ClassDetails.constructor(charClass);
        this.abilityScores = AbilityScores.constructor(abilityScores, racialStatBonus);

        // Get derived fields
        this.abilityModifiers = this.calculateAbilityModifiers();
        this.savingThrows = this.class.savingThrowProficiency;
        this.armorClass = 10 + this.abilityModifiers.dexterity;
        this.initiative = this.abilityScores + this.abilityModifiers.dexterity;
        this.speed = this.race.speed;
        this.hitDice = this.class.hitDice;
        this.hitPointMax = this.hitDice + this.abilityModifiers.constitution;
        this.passivePerception = 10 + this.abilityModifiers.wisdom;

        // Consolidate across race, class, and background
        this.weaponProficiency = Array.from(new Set([this.race.weaponProficiency, this.class.weaponProficiency]));
        this.armorProficiency = Array.from(new Set([this.race.armorProficiency, this.class.armorProficiency]));
        this.features = Array.from(new Set([this.race.features, this.class.features, this.background.features]));

        // Check skill proficiency, tool proficiency, and language selections
        this.skillProficiency = this.checkSkillProficiencies(skillProficiency);
        this.toolProficiency = this.checkToolProficiencies(toolProficiency);
        this.languages = this.checkLanguages(languages);

        this.skills = this.getSkills();

    }

    calculateAbilityModifiers() {
        const score2modifier = (ability) => {
            return Math.floor((ability - 10)/2)
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

    checkSkillProficiencies(skillProficiency) {
        const skillProficiencyOptions = Array.from(new Set([this.race.skillProficiency, this.class.skillProficiency, this.background.skillProficiency]));
        return selectionValidation(skillProficiency, skillProficiencyOptions);
    }

    checkToolProficiencies(toolProficiency) {
        const toolProficiencyOptions = Array.from(new Set([this.race.toolProficiency, this.class.toolProficiency, this.background.toolProficiency]));
        return selectionValidation(toolProficiency, toolProficiencyOptions);
    }

    checkLanguages(languages) {
        const languageOptions = Array.from(new Set([this.race.languages, this.class.languages, this.background.languages]));
        return selectionValidation(languages, languageOptions);
    }

    getSkills() {
        const skills = {
            "Athletics": this.abilityScores.strength,
            "Acrobatics": this.abilityScores.dexterity,
            "Sleight of Hand": this.abilityScores.dexterity,
            "Stealth": this.abilityScores.dexterity,
            "Arcana": this.abilityScores.intelligence,
            "History": this.abilityScores.intelligence,
            "Investigation": this.abilityScores.intelligence,
            "Nature": this.abilityScores.intelligence,
            "Religion": this.abilityScores.intelligence,
            "Animal Handling": this.abilityScores.wisdom,
            "Insight": this.abilityScores.wisdom,
            "Medicine": this.abilityScores.wisdom,
            "Perception": this.abilityScores.wisdom,
            "Survival": this.abilityScores.wisdom,
            "Deception": this.abilityScores.charisma,
            "Intimidation": this.abilityScores.charisma,
            "Performance": this.abilityScores.charisma,
            "Persuasion": this.abilityScores.charisma
        }

        for (let skill in this.skillProficiency) {
            skills[skill] += this.proficiencyBonus;
        }

        return skills;
    }

    toFirestore() {
        return {
            name: this.name,
            race: this.race.name,
            class: this.class.name,
            level: this.level,
            background: {name: this.background.name, description: this.background.description},
            alignment: this.alignment,
            abilityScores: this.abilityScores.getAbilityScores(),
            abilityModifiers: this.abilityModifiers,
            armorClass: this.armorClass,
            initiative: this.initiative,
            speed: this.speed,
            hitDice: this.hitDice,
            hitPointMax: this.hitPointMax,
            proficiencyBonus: this.proficiencyBonus,
            passivePerception: this.passivePerception,
            savingThrows: this.savingThrows,
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

        this.constructor(data.name, data.race, data.class, data.background, data.alignment, data.abilityScores,
            data.racialStatBonus, data.skillProficiency, data.toolProficiency, data.languages, data.personalityTraits,
            data.ideal, data.bond, data.flaw, data.backstory);
    }
}
