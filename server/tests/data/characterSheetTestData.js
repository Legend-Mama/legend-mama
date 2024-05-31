// Input is modeled like generatedChar updated with Race, Class, and Background objects
import {Background} from "../../models/characterSheet.model.js";

export class Character1 {
    constructor() {
        this.charDetails = {
            race: "High Elf",
            class: "Barbarian",
            worldview: "Humanism",
            ethicalTraits: ["Sincere", "Empathetic", "Cowardly", "Trusting"],
            personalityTraits: {
                extroversion: "Reserved",
                agreeableness: "Helpful",
                conscientiousness: "Organized",
                neuroticism: "Anxious",
                openness: "Inquisitive"
            },
            quirks: ["Can't swim"],
            motivations: ["Inner Peace", "Worldly knowledge"],
            fears: ["Loneliness"],
            likes: ["Fine Wine", "Sailing", "Theater", "Parties"],
            dislikes: ["Broccoli"],
            backstory: "Create a story similar to the Gentleman Pirate, Stede Bonnet."
        };
        const background = {
            name: "Acolyte",
                description: "A character who has spent their life in the service of a temple, learning about their faith, performing sacred rites, and gaining a deep connection with their deity.",
                skills: [
                "Insight",
                "Religion"
            ],
                tools: [],
                languages: ["Dwarvish", "Giant"],
                feature: {
                name: "Shelter of the Faithful",
                    description: "Provides the character with significant support from their religious community. As a result, the character and their adventuring party can receive free healing and care at temples and other religious communities associated with their faith, and they can also count on the clergy for support in obtaining information and securing allies."
            }
        };
        this.generatedChar = {
            name: "Elion Windrider",
            race: "High Elf",
            class: "Barbarian",
            background: new Background(background),
            alignment: "Chaotic Good",
            abilityScores: {strength: 8, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
            racialStatBonus: ["dexterity,2", "intelligence,1"],
            languages: ["Common", "Elvish", "Dwarvish", "Giant", "Orc"],
            toolProficiency: [],
            skillProficiency: ["Insight", "Religion", "Perception", "Athletics", "Intimidation"],
            personalityTraits: [
                "I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.",
                "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace."
            ],
            ideal: "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)",
            bond: "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
            flaw: "My piety sometimes leads me to blindly trust those that profess faith in my god.",
            backstory: "Elion Windrider, a high elf of noble birth, grew weary of his genteel life in the elegant spires of Silvermoon. Captivated by tales of swashbuckling pirates, he abandoned his opulent home to chase a life of adventure on the high seas. Despite his well-intentioned dreams, Elion proved to be more endearing than fearsome. His crew, charmed by his naive bravery and awkward swordplay, nicknamed him the \"Gentle Buccaneer.\"\n" +
                "\nElion's true struggle lay with his fear of water, an ironic flaw for a pirate. Unable to swim, he clung to the safety of his ship's deck, often delegating boarding parties to his more capable comrades. Despite his cowardice, Elion's genuine kindness and unexpected cunning earned him the loyalty of his crew. They saw in him a leader whose heart, though not made of steel, was bound by an unyielding spirit of adventure.",
            quote: "The sea calls!"
        };
        this.charSheet = {
            name: "Elion Windrider",
            race: "High Elf",
            class: "Barbarian",
            level: 1,
            background: {
                name: "Acolyte",
                description: "A character who has spent their life in the service of a temple, learning about their faith, performing sacred rites, and gaining a deep connection with their deity.",
                skillProficiency: [
                    "Insight",
                    "Religion"
                ],
                toolProficiency: [],
                languages: ["Dwarvish", "Giant"],
                feature: {
                    name: "Shelter of the Faithful",
                    description: "Provides the character with significant support from their religious community. As a result, the character and their adventuring party can receive free healing and care at temples and other religious communities associated with their faith, and they can also count on the clergy for support in obtaining information and securing allies."
                }
            },
            alignment: "Chaotic Good",
            abilityScores: {strength: 8, dexterity: 17, constitution: 13, intelligence: 11, wisdom: 10, charisma: 15},
            abilityModifiers: {strength: -1, dexterity: 3, constitution: 1, intelligence: 0, wisdom: 0, charisma: 2},
            armorClass: 14,
            initiative: 3,
            speed: 30,
            hitDice: 12,
            hitPointMax: 13,
            proficiencyBonus: 2,
            passivePerception: 10,
            savingThrowProficiency: ["strength", "constitution"],
            savingThrows: {strength: 1, dexterity: 3, constitution: 3, intelligence: 0, wisdom: 0, charisma: 2},
            skillProficiency: ["Insight", "Religion", "Perception", "Athletics", "Intimidation"],
            skills: {
                "Athletics": 1,
                "Acrobatics": 3,
                "Sleight of Hand": 3,
                "Stealth": 3,
                "Arcana": 0,
                "History": 0,
                "Investigation": 0,
                "Nature": 0,
                "Religion": 2,
                "Animal Handling": 0,
                "Insight": 2,
                "Medicine": 0,
                "Perception": 2,
                "Survival": 0,
                "Deception": 2,
                "Intimidation": 4,
                "Performance": 2,
                "Persuasion": 2
            },
            weaponProficiency: [
                "Longsword",
                "Shortsword",
                "Shortbow",
                "Longbow",
                "Club",
                "Dagger",
                "Greatclub",
                "Handaxe",
                "Javelin",
                "Light Hammer",
                "Mace",
                "Quarterstaff",
                "Sickle",
                "Spear",
                "Light Crossbow",
                "Dart",
                "Sling",
                "Battleaxe",
                "Flail",
                "Glaive",
                "Greataxe",
                "Greatsword",
                "Halberd",
                "Lance",
                "Maul",
                "Morningstar",
                "Pike",
                "Rapier",
                "Scimitar",
                "Trident",
                "War pick",
                "Warhammer",
                "Whip",
                "Blowgun",
                "Hand Crossbow",
                "Heavy Crossbow",
                "Net"
            ],
            armorProficiency: [
                "Light Armor",
                "Medium Armor",
                "Shields"
            ],
            toolProficiency: [],
            languages: ["Common", "Elvish", "Dwarvish", "Giant", "Orc"],
            features: [
                "Darkvision",
                "Keen Senses",
                "Fey Ancestry",
                "Trance",
                "Elf Weapon Training",
                "Cantrip",
                "Extra Language",
                "Rage",
                "Unarmored Defense",
                "Shelter of the Faithful"
            ],
            personalityTraits: [
                "I idolize a particular hero of my faith, and constantly refer to that person’s deeds and example.",
                "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace."
            ],
            ideal: "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)",
            bond: "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
            flaw: "My piety sometimes leads me to blindly trust those that profess faith in my god.",
            backstory: "Elion Windrider, a high elf of noble birth, grew weary of his genteel life in the elegant spires of Silvermoon. Captivated by tales of swashbuckling pirates, he abandoned his opulent home to chase a life of adventure on the high seas. Despite his well-intentioned dreams, Elion proved to be more endearing than fearsome. His crew, charmed by his naive bravery and awkward swordplay, nicknamed him the \"Gentle Buccaneer.\"\n" +
                "\nElion's true struggle lay with his fear of water, an ironic flaw for a pirate. Unable to swim, he clung to the safety of his ship's deck, often delegating boarding parties to his more capable comrades. Despite his cowardice, Elion's genuine kindness and unexpected cunning earned him the loyalty of his crew. They saw in him a leader whose heart, though not made of steel, was bound by an unyielding spirit of adventure.",
            quote: "The sea calls!"
        };
    }

    getGeneratedCharacter() {
        return this.generatedChar;
    }

    getCharacterSheet() {
        return this.charSheet;
    }

    getCharacterDetails() {
        return this.charDetails;
    }
}

export class Character2 {
    constructor() {
        this.charDetails = {
            name: "Mystic Raven",
            class: "Sorcerer",
            worldview: "Nihilism",
            ethicalTraits: ["Petty", "Modest", "Honest"],
            personalityTraits: {
                extroversion: "Private",
                agreeableness: "Reserved",
                conscientiousness: "Organized",
                neuroticism: "Anxious",
                openness: "Inquisitive"
            },
            quirks: ["Chews on hair"],
            motivations: ["Mastery of Arcane Arts", "Infernal Patron"],
            fears: ["Stagnation"],
            likes: ["Reading", "Discovering new places", "Music"],
            dislikes: ["Loud noises"],
            backstory: "Create a story similar to the Raven from Teen Titans."
        };
        const background = {
            name: "Hermit",
            description: "A character who has lived in seclusion for a long time, either in a sheltered community such as a monastery, or entirely alone, seeking spiritual enlightenment or personal insight.",
            skills: [
                "Medicine",
                "Religion"
            ],
            tools: ["Herbalism Kit"],
            languages: ["Infernal"],
            feature: {
                name: "Discovery",
                description: "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion."
            }
        };
        this.generatedChar = {
            name: "Mystic Raven",
            race: "Half-Orc",
            class: "Sorcerer",
            background: new Background(background),
            alignment: "Neutral",
            abilityScores: {strength: 10, dexterity: 12, constitution: 14, intelligence: 13, wisdom: 15, charisma: 8},
            racialStatBonus: ["strength,2", "constitution,1"],
            languages: ["Common", "Orc", "Infernal"],
            toolProficiency: ["Herbalism Kit"],
            skillProficiency: ["Medicine", "Religion", "Intimidation", "Deception", "Arcana"],
            personalityTraits: [
                "I connect everything that happens to me to a grand, cosmic plan.",
                "I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings."
            ],
            ideal: "Knowledge. The path to power and self-improvement is through knowledge. (Neutral)",
            bond: "I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.",
            flaw: "I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.",
            backstory: "Isolated from society, Mystic Raven sought the truths of the arcane arts within the confines of a dark cave.",
            quote: "Shh!"

        };
        this.charSheet = {
            name: "Mystic Raven",
            race: "Half-Orc",
            class: "Sorcerer",
            level: 1,
            background: {
                name: "Hermit",
                description: "A character who has lived in seclusion for a long time, either in a sheltered community such as a monastery, or entirely alone, seeking spiritual enlightenment or personal insight.",
                skillProficiency: [
                    "Medicine",
                    "Religion"
                ],
                toolProficiency: ["Herbalism Kit"],
                languages: ["Infernal"],
                feature: {
                    name: "Discovery",
                    description: "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion."
                }
            },
            alignment: "Neutral",
            abilityScores: {strength: 12, dexterity: 12, constitution: 15, intelligence: 13, wisdom: 15, charisma: 8},
            abilityModifiers: {strength: 1, dexterity: 1, constitution: 2, intelligence: 1, wisdom: 2, charisma: -1},
            armorClass: 11,  // Assuming no armor worn
            initiative: 1,
            speed: 30,
            hitDice: 6,  // Sorcerer's hit dice
            hitPointMax: 8,  // Hit dice + constitution modifier
            proficiencyBonus: 2,
            passivePerception: 12,  // 10 + wisdom modifier
            savingThrowProficiency: ["constitution", "charisma"],
            savingThrows: {strength: 1, dexterity: 1, constitution: 4, intelligence: 1, wisdom: 2, charisma: 1},
            skillProficiency: ["Medicine", "Religion", "Intimidation", "Deception", "Arcana"],
            skills: {
                "Athletics": 1,
                "Acrobatics": 1,
                "Sleight of Hand": 1,
                "Stealth": 1,
                "Arcana": 3,
                "History": 1,
                "Investigation": 1,
                "Nature": 1,
                "Religion": 3,
                "Animal Handling": 2,
                "Insight": 2,
                "Medicine": 4,
                "Perception": 2,
                "Survival": 2,
                "Deception": 1,
                "Intimidation": 1,
                "Performance": -1,
                "Persuasion": -1
            },
            weaponProficiency: [
                "Daggers",
                "Darts",
                "Slings",
                "Quarterstaffs",
                "Light Crossbow"
            ],
            armorProficiency: [],
            toolProficiency: ["Herbalism Kit"],
            languages: ["Common", "Orc", "Infernal"],
            features: [
                "Darkvision",
                "Menacing",
                "Relentless Endurance",
                "Savage Attacks",
                "Spellcasting",
                "Sorcerous Origin",
                "Discovery"
            ],
            personalityTraits: [
                "I connect everything that happens to me to a grand, cosmic plan.",
                "I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings."
            ],
            ideal: "Knowledge. The path to power and self-improvement is through knowledge. (Neutral)",
            bond: "I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.",
            flaw: "I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.",
            backstory: "Isolated from society, Mystic Raven sought the truths of the arcane arts within the confines of a dark cave.",
            quote: "Shh!"
        };
    }

    getGeneratedCharacter() {
        return this.generatedChar;
    }

    getCharacterSheet() {
        return this.charSheet;
    }

    getCharacterDetails() {
        return this.charDetails;
    }
}

export const character1 = new Character1();
export const character2 = new Character2();