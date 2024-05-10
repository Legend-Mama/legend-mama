import {expect, assert} from 'chai';
import {pointBuyCheck, pointBuyCorrection} from '../helpers/pointBuyValidation.js';
import {AbilityScores} from "../models/characterSheet.js";
// TODO: Would be nice to implement random testing

function arrEqualityCheck(arr1, arr2) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
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
});