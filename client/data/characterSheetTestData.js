// Input is modeled like generatedChar updated with Race, Class, and Background objects
export class Character1 {
    constructor() {

        this.charDetails = {
            race: "High Elf",
            class: "Barbarian",
            worldview: "Humanism",
            ethicalTraits: ["Sincere", "Empathetic", "Cowardly", "Trusting"],
            personalityTraits: ["Ebullient", "Eccentric", "Unflappable", "Inept"],
            quirks: ["Can't swim"],
            motivations: ["Inner Peace", "Worldly knowledge"],
            fears: ["Loneliness"],
            likes: ["Fine Wine", "Sailing", "Theater", "Parties"],
            dislikes: ["Broccoli"],
            backstory: "Create a story similar to the Gentleman Pirate, Stede Bonnet."
        };
        this.generatedChar = {
            name: "Captain Flapjack",
            race: "High Elf",
            class: "Barbarian",
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
            backstory: "Some fun backstory here"
        };
        this.charSheet = {
            name: "Captain Flapjack",
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
            backstory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Neque egestas congue quisque egestas diam in arcu cursus. Commodo quis imperdiet massa tincidunt. Elit sed vulputate mi sit amet mauris. Ipsum dolor sit amet consectetur adipiscing elit. Tincidunt ornare massa eget egestas purus. Erat pellentesque adipiscing commodo elit. Tincidunt dui ut ornare lectus. Volutpat blandit aliquam etiam erat. Id porta nibh venenatis cras sed felis eget velit. Diam sit amet nisl suscipit adipiscing. Dui id ornare arcu odio ut sem nulla pharetra. Sed blandit libero volutpat sed cras. Justo donec enim diam vulputate. Semper viverra nam libero justo."
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
            personalityTraits: ["Private", "Eccentric", "Brooding", "Intelligent", "Sarcastic"],
            quirks: ["Chews on hair"],
            motivations: ["Mastery of Arcane Arts", "Infernal Patron"],
            fears: ["Stagnation"],
            likes: ["Reading", "Discovering new places", "Music"],
            dislikes: ["Loud noises"],
            backstory: "Create a story similar to the Raven from Teen Titans."
        };
        this.generatedChar = {
            name: "Mystic Raven",
            race: "Half-Orc",
            class: "Sorcerer",
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
            backstory: "Isolated from society, Mystic Raven sought the truths of the arcane arts within the confines of a dark cave."

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
            backstory: "Isolated from society, Mystic Raven sought the truths of the arcane arts within the confines of a dark cave."
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