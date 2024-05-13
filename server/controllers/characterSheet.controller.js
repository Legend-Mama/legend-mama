/*
Controller for character sheet creation/editing
- Implements 5e constraints/checks
 */
import asyncHandler from "express-async-handler";

export const createCharacterSheet = asyncHandler(async (req, res, next) => {
    // TODO: Pass to GPT library to get GeneratedCharacter object

    // TODO: Pass to helpers to check and derive fields

    // TODO: Send back to client
    // Temporary hardcoded character sheet for client development
    const temp =  {
        "name": "Thorin Oakenshield",
        "race": "Hill Dwarf",
        "class": "Cleric",
        "level": 1,
        "background": {
            "name": "Hermit",
            "specialty": "Reclusive Scholar",
            "description": "You lived in seclusion either in a sheltered community such as a monastery, or entirely alone, for a formative part of your life. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.",
            "skillProficiency": {
                "medicine": 2,
                "religion": 2
            },
            "toolProficiency": ["Herbalism Kit"],
            "languages": ["Dwarvish", "Giant"],
            "equipment": ["scroll case stuffed full of notes from your studies or prayers", "winter blanket", "herbalism kit",
                "set of common clothes", "pouch containing 5gp"],
            "feature": ["Discovery"]
        },
        "alignment": "Lawful Neutral",
        "abilityScores": {
            "strength": 14,
            "dexterity": 8,
            "constitution": 15,
            "intelligence": 10,
            "wisdom": 16,
            "charisma": 12
        },
        "abilityModifiers": {
            "strength": 2,
            "dexterity": -1,
            "constitution": 2,
            "intelligence": 0,
            "wisdom": 3,
            "charisma": 1
        },
        "armorClass": 18,
        "initiative": -1,
        "speed": 25,
        "hitDice": "1d8",
        "hitPointMax": 11,
        "proficiencyBonus": 2,
        "passivePerception": 13,
        "savingThrows": {
            "wisdom": 5,
            "charisma": 3
        },
        "skills": {
            "medicine": 5,
            "persuasion": 3,
            "religion": 5
        },
        "weaponProficiency": ["simpleMelee","simpleRanged","martialMelee","martialRanged"],
        "armorProficiency": ["all", "shields"],
        "toolProficiency": ["Herbalism Kit"],
        "languages": ["Common", "Dwarvish", "Giant"],
        "personalityTraits": [
            "I connect everything that happens to me to a grand, cosmic plan.",
            "I am utterly serene, even in the face of disaster."
        ],
        "ideal": "Inner Peace. I am content as long as I am allowed to live my life dedicated to my religious studies and observances.",
        "bond": "I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.",
        "flaw": "I am dogmatic in my thoughts and philosophy.",
        "features": [
            "Spellcasting", "Divine Domain",
            "Darkvision", "Dwarven Resilience", "Dwarven Toughness"
        ],
        "backstory": "Born into a distinguished family of divine healers, I left the comfort of my home to seek solitude and understanding in the mountains, meditating on the complexities of life and the divine.",
        "equipment": [
            "Scale Mail", "Shield", "Mace",
            "scroll case stuffed full of notes from your studies or prayers", "winter blanket", "herbalism kit",
            "set of common clothes", "pouch containing 5gp"
        ]
    };
    console.log("Successfully created character sheet");
    res.status(201).json(temp);
})

export const editCharacterSheet = asyncHandler(async (req, res, next) => {
    // TODO: Check the edits

    // TODO: Update any fields

    // TODO: raise error if invalid

    // TODO: return updated character
    const data = req.body;
    console.log("Successfully updated character sheet");
    res.status(200).send(data);
})
