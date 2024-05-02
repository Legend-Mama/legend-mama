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

class AbilityScoreError extends Error {
    constructor(message) {
        super(message);
        this.name = "AbilityScoreError";
    }
}


class Background {
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
}

class AbilityScores {
    static level = 1;
    static proficiencyBonus = 2;

    constructor(scores, scoreIncrease) {
        this.rawScores = scores;
        this.scoreIncrease = scoreIncrease;
        this.strength = scores.strength + scoreIncrease.strength;
        this.dexterity = scores.dexterity + scoreIncrease.dexterity;
        this.constitution = scores.constitution + scoreIncrease.constitution;
        this.intelligence = scores.intelligence + scoreIncrease.intelligence;
        this.wisdom = scores.wisdom + scoreIncrease.wisdom;
        this.charisma = scores.charisma + scoreIncrease.charisma;
    }

    checkRawScores() {
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
        for (const ability in this.rawScores) {
            cost = pointBuyCost(this.rawScores[ability]);
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

    getAbilityScores() {
        return {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma
        }
    }

    getAbilityModifiers() {
        const score2modifier = (ability) => {
            return Math.floor((ability - 10)/2)
        }
        return {
            strength: score2modifier(this.strength),
            dexterity: score2modifier(this.dexterity),
            constitution: score2modifier(this.constitution),
            intelligence: score2modifier(this.intelligence),
            wisdom: score2modifier(this.wisdom),
            charisma: score2modifier(this.charisma)
        }
    }
}

class CharacterSheet {
    constructor (name, race, charClass, background, alignment, abilityScores, abilityScoreIncrease,
                 abilityModifiers, armorClass, initiative) {
        this.name = name;
        this.race = race;
        this.class = charClass;
        this.level = 1;
    }
    toString() {
        return this.name + ', ' + this.race;
    }
}





// Firestore data converter
const characterSheetConverter = {
    toFirestore: (characterSheet) => {
        return {
            name: characterSheet.name,
            race: characterSheet.race,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new CharacterSheet(data.name, data.race);
    }
};

export * from "characterSheet.js";