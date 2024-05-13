import {expect} from 'chai';
import {RaceDetails, ClassDetails, Background, CharacterSheet} from '../models/characterSheet.js'
import {Character1, Character2} from "./data/characterSheetTestData.js";

const char1 = new Character1();
const char2 = new Character2();

describe('Character Sheet and Associated Objects', () => {

    describe('Race Details', () => {
        it('returns object for High Elf', () => {
            const expected = {
                name: "High Elf",
                description: "Known for their grace and longevity, elves live in natural settings and are often seen as aloof. They come in different kinds, including high elves, wood elves, and dark elves (drow). Elves have keen senses and intuition, reflected in their proficiency in Perception. They also have Fey Ancestry, which grants them advantage on saving throws against being charmed, and immunity to magical sleep.  High elves are a subrace of elves who have a keen mind and mastery over the basics of magic.",
                racialStatBonus: [
                    "dexterity,2",
                    "intelligence,1"
                ],
                hpBonus: 0,
                speed: 30,
                weaponProficiency: [
                    "Longsword",
                    "Shortsword",
                    "Shortbow",
                    "Longbow"
                ],
                armorProficiency: [],
                toolProficiency: [],
                languages: [
                    "Common",
                    "Elvish",
                    {
                        "select": 1,
                        "options": [
                            "Dwarvish",
                            "Giant",
                            "Gnomish",
                            "Goblin",
                            "Halfling",
                            "Orc",
                            "Abyssal",
                            "Celestial",
                            "Draconic",
                            "Deep Speech",
                            "Infernal",
                            "Primordial",
                            "Sylvan",
                            "Undercommon"
                        ]
                    }
                ],
                features: [
                    "Darkvision",
                    "Keen Senses",
                    "Fey Ancestry",
                    "Trance",
                    "Elf Weapon Training",
                    "Cantrip",
                    "Extra Language"
                ],
                skillProficiency: [
                    "Perception"
                ]
            };

            const returned = new RaceDetails("High Elf");
            expect(returned).to.deep.equal(expected);
        });
    });

    describe('Class Details', () => {
        it('returns object for Barbarian', () => {
            const expected = {
                name: "Barbarian",
                description: "",
                hitDice: 12,
                unarmoredACBonus: "constitution",
                armorProficiency: [
                    "Light Armor",
                    "Medium Armor",
                    "Shields"
                ],
                weaponProficiency: [
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
                    "Shortbow",
                    "Sling",
                    "Battleaxe",
                    "Flail",
                    "Glaive",
                    "Greataxe",
                    "Greatsword",
                    "Halberd",
                    "Lance",
                    "Longsword",
                    "Maul",
                    "Morningstar",
                    "Pike",
                    "Rapier",
                    "Scimitar",
                    "Shortsword",
                    "Trident",
                    "War pick",
                    "Warhammer",
                    "Whip",
                    "Blowgun",
                    "Hand Crossbow",
                    "Heavy Crossbow",
                    "Longbow",
                    "Net"
                ],
                toolProficiency: [],
                "savingThrowProficiency": [
                    "strength",
                    "constitution"
                ],
                skillProficiency: [
                    {
                        "select": 2,
                        "options": [
                            "Animal Handling",
                            "Athletics",
                            "Intimidation",
                            "Nature",
                            "Perception",
                            "Survival"
                        ]
                    }
                ],
                languages: [],
                features: [
                    "Rage",
                    "Unarmored Defense"
                ]
            };

            const returned = new ClassDetails("Barbarian");
            expect(returned).to.deep.equal(expected);
        });
    });

    describe('Background', () => {
        it('returns object for Acolyte', () => {
            const expected = {
                name: "Acolyte",
                description: "A character who has spent their life in the service of a temple, learning about their faith, performing sacred rites, and gaining a deep connection with their deity.",
                skillProficiency: [
                    "Insight",
                    "Religion"
                ],
                toolProficiency: [],
                languages: [
                    {
                        "select": 2,
                        "options": [
                            "Elvish",
                            "Dwarvish",
                            "Giant",
                            "Gnomish",
                            "Goblin",
                            "Halfling",
                            "Orc",
                            "Abyssal",
                            "Celestial",
                            "Draconic",
                            "Deep Speech",
                            "Infernal",
                            "Primordial",
                            "Sylvan",
                            "Undercommon"
                        ]
                    }
                ],
                feature: {name: "Shelter of the Faithful", description: "Provides the character with significant support from their religious community. As a result, the character and their adventuring party can receive free healing and care at temples and other religious communities associated with their faith, and they can also count on the clergy for support in obtaining information and securing allies."}
            };
            const input = {
                name: "Acolyte",
                description: "A character who has spent their life in the service of a temple, learning about their faith, performing sacred rites, and gaining a deep connection with their deity.",
                skillProficiency: [
                    "Insight",
                    "Religion"
                ],
                toolProficiency: [],
                languages: [
                    {
                        "select": 2,
                        "options": [
                            "Elvish",
                            "Dwarvish",
                            "Giant",
                            "Gnomish",
                            "Goblin",
                            "Halfling",
                            "Orc",
                            "Abyssal",
                            "Celestial",
                            "Draconic",
                            "Deep Speech",
                            "Infernal",
                            "Primordial",
                            "Sylvan",
                            "Undercommon"
                        ]
                    }
                ],
                feature: {
                    name: "Shelter of the Faithful",
                    description: "Provides the character with significant support from their religious community. As a result, the character and their adventuring party can receive free healing and care at temples and other religious communities associated with their faith, and they can also count on the clergy for support in obtaining information and securing allies."
                }
            };

            const returned = new Background(input);
            expect(returned).to.deep.equal(expected);
        });
    });

    describe('Character Sheet', () => {
        it('returns character sheet for valid character (1)', () => {
            const returned = new CharacterSheet(char1.generatedChar)
            expect(returned.toJSON()).to.deep.equal(char1.expected);
        });

        it('returns character sheet for valid character (2)', () => {
            const returned = new CharacterSheet(char2.generatedChar)
            expect(returned.toJSON()).to.deep.equal(char2.expected);
        });

    });
});