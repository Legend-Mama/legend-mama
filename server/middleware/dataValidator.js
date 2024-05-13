import {body, validationResult} from 'express-validator';
import classes from '../data/dnd5e/classes.json' with {type: 'json'};
import races from '../data/dnd5e/races.json' with {type: 'json'};
import alignments from '../data/dnd5e/alignments.json' with {type: 'json'};

classes = classes.keys();
races = races.keys();
alignments = alignments.keys();

// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        body('racialStatBonus.*').matches(/^\w+,\d+$/).withMessage('Must be in the format "ability,integerScore"'),

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


