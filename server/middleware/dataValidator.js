import {body, validationResult, matchedData} from 'express-validator';
import classData from '../data/dnd5e/classes.json' with {type: 'json'};
import raceData from '../data/dnd5e/races.json' with {type: 'json'};
import alignmentData from '../data/dnd5e/alignments.json' with {type: 'json'};

const classes = Object.keys(classData);
const races = Object.keys(raceData);
const alignments = Object.keys(alignmentData);

// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go

export const validate = (req, res, next) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: true, onlyValidData: true });

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
        body('name').optional().isString().trim(),
        body('race').optional().isIn(races),
        body('class').optional().isIn(classes),
        body('worldview').isString().trim(),
        body('backstory').optional().isString().trim(),

        // Validating and sanitizing the array attributes
        body('ethicalTraits').isArray({ min: 1 }),
        body('ethicalTraits.*').trim(),
        body('personalityTraits').isArray({ min: 1 }),
        body('personalityTraits.*').isString().trim(),
        body('quirks').optional().isArray(),
        body('quirks.*').isString().trim(),
        body('motivations').isArray({ min: 1 }),
        body('motivations.*').isString().trim(),
        body('fears').isArray({ min: 1 }),
        body('fears.*').isString().trim(),
        body('likes').optional().isArray(),
        body('likes.*').isString().trim(),
        body('dislikes').optional().isArray(),
        body('dislikes.*').isString().trim(),
    ];
};

export const generatedCharacterValidationRules = () => {
    return [
        // Validating and sanitizing the string attributes
        body('name').isString().trim(),
        body('race').isIn(races),
        body('class').isIn(classes),
        body('alignment').isIn(alignments),
        body('ideal').isString().trim(),
        body('bond').isString().trim(),
        body('flaw').isString().trim(),
        body('backstory').isString().trim(),

        // Validating and sanitizing the array attributes
        body('toolProficiency').isArray(),
        body('toolProficiency.*').isString().trim(),
        body('languages').isArray(),
        body('languages.*').isString().trim(),
        body('skillProficiency').isArray(),
        body('skillProficiency.*').isString().trim(),
        body('personalityTraits').isArray({ min: 2, max: 2 }),
        body('personalityTraits.*').isString().trim(),
        body('racialStatBonus').isArray(),
        body('racialStatBonus.*').matches(/^(strength|dexterity|constitution|intelligence|wisdom|charisma)+,\d+$/).withMessage('Must be in the format "ability,bonus"'),

        // Validating and sanitizing the object attributes
        body("background.name").isString().trim(),
        body("background.description").isString().trim(),
        body("background.skillProficiency").isArray({min: 2, max: 2}),
        body('background.skillProficiency.*').isString().trim(),
        body("background.toolProficiency").isArray(),
        body('background.toolProficiency.*').isString().trim(),
        body("background.languages").isArray(),
        body('background.languages.*').trim(),
        body("background.feature").isObject(),
        body('background.feature.*').isString().trim(),
        body("abilityScores.strength").isInt({min: 8}),
        body("abilityScores.dexterity").isInt({min: 8}),
        body("abilityScores.constitution").isInt({min: 8}),
        body("abilityScores.intelligence").isInt({min: 8}),
        body("abilityScores.wisdom").isInt({min: 8}),
        body("abilityScores.charisma").isInt({min: 8}),
    ];
};

/**
 * The context for this validator is a character sheet has already been
 * saved, and we want to save it to an account. This is less about 5e checking and more about validation/sanitization.
 * Trying to decide if I should have POST and PUT validator so that for PUT fields can be optional
 */
export const characterSheetValidationRules = () => {
    return [
        // Validating and sanitizing the string attributes
        body('name').isString().trim(),
        body('race').isIn(races),
        body('class').isIn(classes),
        body('alignment').isIn(alignments),
        body('ideal').isString().trim(),
        body('bond').isString().trim(),
        body('flaw').isString().trim(),
        body('backstory').isString().trim(),

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
        body('armorProficiency.*').isString().trim(),
        body('weaponProficiency').isArray(),
        body('weaponProficiency.*').isString().trim(),
        body('toolProficiency').isArray(),
        body('toolProficiency.*').isString().trim(),
        body('languages').isArray(),
        body('languages.*').isString().trim(),
        body('skillProficiency').isArray(),
        body('skillProficiency.*').isString().trim(),
        body('features').isArray(),
        body('features.*').isString().trim(),
        body('personalityTraits').isArray({ min: 2, max: 2 }),
        body('personalityTraits.*').isString().trim(),

        // Validating and sanitizing the object attributes
        // Background
        body("background.name").isString().trim(),
        body("background.description").isString().trim(),
        body("background.feature").isObject(),
        body('background.feature.*').isString().trim(),

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


