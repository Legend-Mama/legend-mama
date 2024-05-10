import {expect, assert} from 'chai';
import {RaceDetails, ClassDetails, Background, AbilityScores} from '../models/characterSheet.js'

describe('Character Sheet and Associated Objects', () => {

    describe('Race details', () => {
        it('returns object for High Elf', () => {
            const expected = {
                name: "High Elf",
                description: "Known for their grace and longevity, elves live in natural settings and are often seen as aloof. They come in different kinds, including high elves, wood elves, and dark elves (drow). Elves have keen senses and intuition, reflected in their proficiency in Perception. They also have Fey Ancestry, which grants them advantage on saving throws against being charmed, and immunity to magical sleep.  High elves are a subrace of elves who have a keen mind and mastery over the basics of magic.",
                racialStatBonus: [
                    ["dexterity", 2],
                    ["intelligence", 1]
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

    describe('Class details', () => {
        it('returns object for Barbarian', () => {
            const expected = {
                name: "Barbarian",
                description: "",
                hitDice: 12,
                unarmoredACBonus: "Constitution",
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
                    "Light hammer",
                    "Mace",
                    "Quarterstaff",
                    "Sickle",
                    "Spear",
                    "Crossbow, light",
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
                    "Crossbow, hand",
                    "Crossbow, heavy",
                    "Longbow",
                    "Net"
                ],
                toolProficiency: [],
                "savingThrowProficiency": [
                    "Strength",
                    "Constitution"
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
                feature: {"Shelter of the Faithful": "Provides the character with significant support from their religious community. As a result, the character and their adventuring party can receive free healing and care at temples and other religious communities associated with their faith, and they can also count on the clergy for support in obtaining information and securing allies."}
            };
            const returned = new Background(
                "Acolyte",
                "A character who has spent their life in the service of a temple, learning about their faith, performing sacred rites, and gaining a deep connection with their deity.",
                [
                    "Insight",
                    "Religion"
                ],
                [],
                [
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
                {"Shelter of the Faithful": "Provides the character with significant support from their religious community. As a result, the character and their adventuring party can receive free healing and care at temples and other religious communities associated with their faith, and they can also count on the clergy for support in obtaining information and securing allies."}
                );

            expect(returned).to.deep.equal(expected);
        });
    });

    describe('Ability Scores', () => {
        it('returns object when provided correct base scores and bonuses', () => {
            const expected = {
                baseScores: {strength: 8, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
                bonuses: {strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1}
            };
            const returned = new AbilityScores(
                {strength: 8, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
                {
                    selection: ["dexterity,2", "charisma,1"],
                    options: ["dexterity,2", "charisma,1"]
                }
            );

            expect(returned).to.deep.equal(expected);
        });

        it('returns corrected object when provided correct base scores and incorrect bonuses', () => {
            const expected = {
                baseScores: {strength: 8, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
                bonuses: {strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1}
            };
            const returned = new AbilityScores(
                {strength: 8, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
                {
                    selection: ["dexterity,2", "charisma,2", "strength,1"],
                    options: ["dexterity,2", "charisma,1"]
                }
            );

            expect(returned).to.deep.equal(expected);
        });

        it('returns corrected object when provided incorrect base scores and correct bonuses', () => {
            const expected = {
                baseScores: {strength: 8, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
                bonuses: {strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1}
            };
            const returned = new AbilityScores(
                {strength: 10, dexterity: 15, constitution: 13, intelligence: 10, wisdom: 10, charisma: 15},
                {
                    selection: ["dexterity,2", "charisma,1"],
                    options: ["dexterity,2", "charisma,1"]
                }
            );

            expect(returned).to.deep.equal(expected);
        });
    });
});