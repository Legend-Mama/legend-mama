import {body, validationResult} from 'express-validator';
import classData from '../data/dnd5e/classes.json' with {type: 'json'};
import raceData from '../data/dnd5e/races.json' with {type: 'json'};
import alignmentData from '../data/dnd5e/alignments.json' with {type: 'json'};

const classes = Object.keys(classData);
const races = Object.keys(raceData);
const alignments = Object.keys(alignmentData);

// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

export const characterDetailsValidationRules = () => {
    return [
        // Validating and sanitizing the string attributes
        body('name').optional().isString().trim().escape(),
        body('race').optional().isIn(races),
        body('class').optional().isIn(classes),
        body('worldview').isString().trim().escape(),
        body('backstory').optional().isString().trim().escape(),

        // Validating and sanitizing the array attributes
        body('ethicalTraits').isArray({ min: 1 }),
        body('ethicalTraits.*').trim().escape(),
        body('personalityTraits').isArray({ min: 1 }),
        body('personalityTraits.*').isString().trim().escape(),
        body('quirks').optional().isArray(),
        body('quirks.*').isString().trim().escape(),
        body('motivations').isArray({ min: 1 }),
        body('motivations.*').isString().trim().escape(),
        body('fears').isArray({ min: 1 }),
        body('fears.*').isString().trim().escape(),
        body('likes').optional().isArray(),
        body('likes.*').isString().trim().escape(),
        body('dislikes').optional().isArray(),
        body('dislikes.*').isString().trim().escape(),
    ];
};

export const generatedCharacterValidationRules = () => {
    return [
        // Validating and sanitizing the string attributes
        body('name').isString().trim().escape(),
        body('race').isIn(races),
        body('class').isIn(classes),
        body('alignment').isIn(alignments),
        body('ideal').isString().trim().escape(),
        body('bond').isString().trim().escape(),
        body('flaw').isString().trim().escape(),
        body('backstory').isString().trim().escape(),

        // Validating and sanitizing the array attributes
        body('toolProficiency').isArray(),
        body('toolProficiency.*').isString().trim().escape(),
        body('languages').isArray(),
        body('languages.*').isString().trim().escape(),
        body('skillProficiency').isArray(),
        body('skillProficiency.*').isString().trim().escape(),
        body('personalityTraits').isArray({ min: 2, max: 2 }),
        body('personalityTraits.*').isString().trim().escape(),
        body('racialStatBonus').isArray(),
        body('racialStatBonus.*').matches(/^(strength|dexterity|constitution|intelligence|wisdom|charisma)+,\d+$/).withMessage('Must be in the format "ability,bonus"'),

        // Validating and sanitizing the object attributes
        body("background.name").isString().trim().escape(),
        body("background.description").isString().trim().escape(),
        body("background.skillProficiency").isArray({min: 2, max: 2}),
        body('background.skillProficiency.*').isString().trim().escape(),
        body("background.toolProficiency").isArray(),
        body('background.toolProficiency.*').isString().trim().escape(),
        body("background.languages").isArray(),
        body('background.languages.*').isString().trim().escape(),
        body("background.feature").isObject(),
        body('background.feature.*').isString().trim().escape(),
        body("abilityScores.strength").isInt({min: 8}),
        body("abilityScores.dexterity").isInt({min: 8}),
        body("abilityScores.constitution").isInt({min: 8}),
        body("abilityScores.intelligence").isInt({min: 8}),
        body("abilityScores.wisdom").isInt({min: 8}),
        body("abilityScores.charisma").isInt({min: 8}),
    ];
};

export const characterSheetValidationRules = () => {
    return [
        // Validating and sanitizing the string attributes
        body('name').isString().trim().escape(),
        body('race').isIn(races),
        body('class').isIn(classes),
        body('alignment').isIn(alignments),
        body('ideal').isString().trim().escape(),
        body('bond').isString().trim().escape(),
        body('flaw').isString().trim().escape(),
        body('backstory').isString().trim().escape(),

        // Validating and sanitizing integer attributes
        body("level").isInt(),
        body("armorClass").isInt(),
        body("initiative").isInt(),
        body("speed").isInt(),
        body("hitDice").isInt(),
        body("hitPointMax").isInt(),
        body("proficiencyBonus").isInt(),
        body("passivePerception").isInt(),

        // Validating and sanitizing the array attributes
        body('armorProficiency').isArray(),
        body('armorProficiency.*').isString().trim().escape(),
        body('weaponProficiency').isArray(),
        body('weaponProficiency.*').isString().trim().escape(),
        body('toolProficiency').isArray(),
        body('toolProficiency.*').isString().trim().escape(),
        body('languages').isArray(),
        body('languages.*').isString().trim().escape(),
        body('skillProficiency').isArray(),
        body('skillProficiency.*').isString().trim().escape(),
        body('features').isArray(),
        body('features.*').isString().trim().escape(),
        body('personalityTraits').isArray({ min: 2, max: 2 }),
        body('personalityTraits.*').isString().trim().escape(),

        // Validating and sanitizing the object attributes
        // Background
        body("background.name").isString().trim().escape(),
        body("background.description").isString().trim().escape(),
        body("background.feature").isObject(),
        body('background.feature.*').isString().trim().escape(),

        // Ability Scores
        body("abilityScores.strength").isInt({min: 8}),
        body("abilityScores.dexterity").isInt({min: 8}),
        body("abilityScores.constitution").isInt({min: 8}),
        body("abilityScores.intelligence").isInt({min: 8}),
        body("abilityScores.wisdom").isInt({min: 8}),
        body("abilityScores.charisma").isInt({min: 8}),

        // Ability Modifiers
        body("abilityModifiers.strength").isInt(),
        body("abilityModifiers.dexterity").isInt(),
        body("abilityModifiers.constitution").isInt(),
        body("abilityModifiers.intelligence").isInt(),
        body("abilityModifiers.wisdom").isInt(),
        body("abilityModifiers.charisma").isInt(),

        // Saving Throws
        body("savingThrows.strength").isInt(),
        body("savingThrows.dexterity").isInt(),
        body("savingThrows.constitution").isInt(),
        body("savingThrows.intelligence").isInt(),
        body("savingThrows.wisdom").isInt(),
        body("savingThrows.charisma").isInt(),

        // Skills
        body("skills.Athletics").isInt(),
        body("skills.Acrobatics").isInt(),
        body("skills.Sleight of Hand").isInt(),
        body("skills.Stealth").isInt(),
        body("skills.Arcana").isInt(),
        body("skills.History").isInt(),
        body("skills.Investigation").isInt(),
        body("skills.Nature").isInt(),
        body("skills.Religion").isInt(),
        body("skills.Animal Handling").isInt(),
        body("skills.Insight").isInt(),
        body("skills.Medicine").isInt(),
        body("skills.Perception").isInt(),
        body("skills.Survival").isInt(),
        body("skills.Deception").isInt(),
        body("skills.Intimidation").isInt(),
        body("skills.Performance").isInt(),
        body("skills.Persuasion").isInt(),
    ];
};


