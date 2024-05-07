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

// TODO: Implement logic to manage any check failures (i.e. if bad abiity score, generate a good ability score)

class AbilityScoreError extends Error {
    constructor(message) {
        super(message);
        this.name = "AbilityScoreError";
    }
}

function selectionCheck(options, selection) {
    // Remove required selections
    let opts = options.filter(element => !selection.includes(element));
    selection.filter(element => !options.includes(element));

    // Check selection isn't missing required selections
    const allHaveSelect = opts.every(el => el?.select !== undefined);
    if (!allHaveSelect) {
        throw new Error('Missing required selections');
    }

    // Check selection categories
    let total = 0;
    let matches;
    for (let opt in opts) {
        total += opt.select;

        matches = opt.options.reduce((count, el) => count +  selection.has(el), 0);
        if (matches < opt.select) {
            throw new Error('Too few selections');
        }
    }

    if (selection.length > total) {
        throw new Error('Too many selections');
    }
}

class RaceDetails {
    description;
    racialStatBonus;
    speed;
    weaponProficiency;
    armorProficiency;
    toolProficiency;
    skillProficiency;
    languages;
    features;

    constructor(name) {
        this.name = name;
        this.getRaceDetails();
    }

    getRaceDetails() {
        const data = races[this.name];
        this.description = data.description;
        this.racialStatBonus = data.racialStatBonus;
        this.speed = data.speed;
        this.weaponProficiency = data.weaponProficiency.map(obj => weapons[obj] || obj).flat();
        this.armorProficiency = data.armorProficiency;
        this.toolProficiency = data.toolProficiency.map(obj => tools[obj] || obj).flat();
        this.skillProficiency = data.skillProficiency;
        this.languages = data.languages;
        this.features = data.features;
    }
}

class ClassDetails {
    description;
    hitDice;
    unarmedACModifier;
    weaponProficiency;
    armorProficiency;
    toolProficiency;
    skillProficiency;
    savingThrowProficiency;
    languages;
    features;

    constructor(name) {
        this.name = name;
        this.getClassDetails();
    }

    getClassDetails() {
        const data = classes[this.name];
        this.description = data.description;
        this.hitDice = data.hitDice;
        this.unarmedACModifier = data.unarmedACModifier;
        this.weaponProficiency = data.weaponProficiency.map(obj => weapons[obj] || obj).flat();
        this.armorProficiency = data.armorProficiency;
        this.toolProficiency = data.toolProficiency.map(obj => tools[obj] || obj).flat();
        this.skillProficiency = data.skillProficiency;
        this.savingThrowProficiency = data.savingThrowProficiency;
        this.languages = data.languages;
        this.features = data.features;
    }
}

class BackgroundDetails {
    constructor(name, specialty, description, skillProficiency, toolProficiency, languages, equipment, feature) {
        this.name = name;
        this.specialty = specialty;
        this.description = description;
        this.skillProficiency = skillProficiency;
        this.toolProficiency = toolProficiency;
        this.languages = languages;
        this.equipment = equipment;
        this.feature = feature;
    }
    // Checks against background rules
    // Proficiency in 2 skills, 2 total tool proficiencies and/or languages, 1 feature
}

class AbilityScores {
    constructor(baseScores, racialStatBonus) {
        this.baseScores = baseScores;
        this.checkBaseScores();

        this.racialStatBonus = racialStatBonus;
        this.checkRacialStatBonus();

        this.strength = {score: baseScores.strength, bonus: racialStatBonus.selection.strength};
        this.dexterity = {score: baseScores.dexterity, bonus: racialStatBonus.selection.dexterity};
        this.constitution = {score: baseScores.constitution, bonus: racialStatBonus.selection.constitution};
        this.intelligence = {score: baseScores.intelligence, bonus: racialStatBonus.selection.intelligence};
        this.wisdom = {score: baseScores.wisdom, bonus: racialStatBonus.selection.wisdom};
        this.charisma = {score: baseScores.charisma, bonus: racialStatBonus.selection.charisma};
    }

    checkBaseScores() {
        const pointBuyCost = (score) => {
            if (8 < score < 15) {
                return score - 8;
            } else if (score === 15) {
                return 9;
            } else {
                return -1;
            }
        }

        let points = 27;
        let cost;
        for (const ability in this.baseScores) {
            cost = pointBuyCost(this.baseScores[ability]);
            if (cost > -1) {
                points -= cost;
                if (points < 0) {
                    throw new AbilityScoreError("Too many points used!");
                } else if (points > 0) {
                    throw new AbilityScoreError(`Unused points: ${points}`);
                }
            } else {
                throw new AbilityScoreError(`Invalid score: ${ability}`);
            }
        }
    }

    checkRacialStatBonus() {
        try {
            selectionCheck(this.racialStatBonus.options, this.racialStatBonus.selection);
        } catch (err) {
            throw new AbilityScoreError(`Racial Stat Bonus - ${err.message}`);
        }
    }

    getAbilityScores() {
        return {
            strength: this.strength.score + this.strength.bonus,
            dexterity: this.dexterity.score + this.dexterity.bonus,
            constitution: this.constitution.score + this.constitution.bonus,
            intelligence: this.intelligence.score + this.intelligence.bonus,
            wisdom: this.wisdom.score + this.wisdom.bonus,
            charisma: this.charisma.score + this.charisma.bonus
        }
    }
}

class CharacterSheet {
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

        // Consolidate options across race, class, and background
        this.toolProficiencyOptions = Array.from(new Set([this.race.toolProficiency, this.class.toolProficiency, this.background.toolProficiency]));
        this.skillProficiencyOptions = Array.from(new Set([this.race.skillProficiency, this.class.skillProficiency, this.background.skillProficiency]));
        this.languageOptions = Array.from(new Set([this.race.languages, this.class.languages, this.background.languages]));

        // Check selections
        this.skills = this.checkSkills(skillProficiency);
        this.toolProficiency = this.checkTools(toolProficiency);
        this.languages = this.checkLanguages(languages);
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

    checkSkills(skillProficiency) {
        try {
            selectionCheck(this.skillProficiencyOptions, skillProficiency);
        } catch (err) {
            throw new AbilityScoreError(`Skill Proficiencies - ${err.message}`);
        }

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

        for (let skill in skillProficiency) {
            skills[skill] += this.proficiencyBonus;
        }

        return skills;
    }

    checkTools(toolProficiency) {
        try {
            selectionCheck(this.toolProficiencyOptions, toolProficiency);
        } catch (err) {
            throw new AbilityScoreError(`Tool Proficiencies - ${err.message}`);
        }

        return toolProficiency;
    }

    checkLanguages(languages) {
        try {
            selectionCheck(this.languageOptions, languages);
        } catch (err) {
            throw new AbilityScoreError(`Languages - ${err.message}`);
        }

        return languages;
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

export * from "characterSheet.js";