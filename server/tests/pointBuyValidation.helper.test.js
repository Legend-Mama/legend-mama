import {expect} from 'chai';
import pointBuyValidation, {pointBuyCheck, pointBuyCorrection} from '../helpers/pointBuyValidation.js';
import {getRandomInt, nRandomIndices} from "../helpers/utilities.js";

function validAbilityScores() {
    const pointBuyCost = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9
    };
    const scores = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    }
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const inds = nRandomIndices(abilities.length, abilities.length);

    let pointsBefore, points, val;
    do {
        points = 27;
        for (let i= 0; i < 6; i++) {
            val = getRandomInt(8, 15);
            pointsBefore = points;

            if (points === 0) {
                val = 8;
            } else if (pointBuyCost[val] > points) {
                val = getRandomInt(8, 15);
            } else if ((i === 5) && points > 0) {
                val = parseInt(Object.keys(pointBuyCost).find(key => pointBuyCost[key] === points));
            }

            points -= pointBuyCost[val];
            scores[abilities[inds[i]]] = val;
        }
    } while (points !== 0)

    return scores;
}

function invalidAbilityScores() {
    const scores = validAbilityScores();

    // Randomly select some abilities to mess up
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const inds = nRandomIndices(getRandomInt(1, 6), abilities.length);

    let adj;
    for (const ind of inds) {
        adj = getRandomInt(-5, 5);
        scores[abilities[ind]] += adj;
    }

    return scores;
}

describe('Point Buy Validation', () => {
    describe('Point Buy Check', () => {
        it('returns true for valid scores (1)', () => {
            const scores = {'strength': 15, 'dexterity': 15, 'constitution': 11, 'intelligence': 10, 'wisdom': 10, 'charisma': 10};
            expect(pointBuyCheck(scores)).to.be.true;
        });

        it('returns true for valid scores (2)', () => {
            const scores = {'strength': 8, 'dexterity': 13, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            expect(pointBuyCheck(scores)).to.be.true;
        });

        it('returns false for invalid scores', () => {
            const scores = {'strength': 18, 'dexterity': 13, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            expect(pointBuyCheck(scores)).to.be.false;
        });

        it('returns false for too many points used', () => {
            const scores = {'strength': 10, 'dexterity': 13, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            expect(pointBuyCheck(scores)).to.be.false;
        });

        it('returns false for unused points', () => {
            const scores = {'strength': 8, 'dexterity': 10, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            expect(pointBuyCheck(scores)).to.be.false;
        });
    });

    describe('Point Buy Correction', () => {
        it('returns corrected scores for invalid scores', () => {
            const scores = {'strength': 18, 'dexterity': 13, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            const expected = {'strength': 15, 'dexterity': 8, 'constitution': 8, 'intelligence': 14, 'wisdom': 14, 'charisma': 12};
            const returned = pointBuyCorrection(scores);

            expect(returned).to.deep.equal(expected);
        });

        it('returns corrected scores for too many points used', () => {
            const scores = {'strength': 10, 'dexterity': 13, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            const expected = {'strength': 9, 'dexterity': 13, 'constitution': 8, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            const returned = pointBuyCorrection(scores);

            expect(returned).to.deep.equal(expected);
        });

        it('returns corrected scores for unused points', () => {
            const scores = {'strength': 8, 'dexterity': 10, 'constitution': 9, 'intelligence': 14, 'wisdom': 14, 'charisma': 14};
            const expected = {'strength': 8, 'dexterity': 8, 'constitution': 8, 'intelligence': 15, 'wisdom': 15, 'charisma': 15};

            const returned = pointBuyCorrection(scores);

            expect(returned).to.deep.equal(expected);
        });
    });

    describe("Random Testing", () => {
        const n = 5000;
        let scores, returned, title;
        for (let i = 0; i < n; i++) {
            title = `Random Test Iteration ${i+1} - Valid Scores`;
            it(title, () => {
                scores = validAbilityScores();
                returned = pointBuyValidation(scores);
                expect(returned).to.deep.equal(scores);
            });
        }

        for (let i = 0; i < n; i++) {
            title = `Random Test Iteration ${i+1} - Invalid Scores`;
            it(title, () => {
                scores = invalidAbilityScores();
                returned = pointBuyValidation(scores);
                expect(pointBuyCheck(returned), `\nScores before correction: ${JSON.stringify(scores)}\nScores after correction: ${JSON.stringify(returned)}`).to.be.true;
            });
        }
    });
});