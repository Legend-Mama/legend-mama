import {expect, assert} from 'chai';
import {selectionCheck, selectionCorrection} from '../helpers/selectionValidation.js';
// TODO: Would be nice to implement random testing

function arrEqualityCheck(arr1, arr2) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

describe('Selection Validation', () => {
    const rules = [
        'A', 'B', 'C',
        {'select': 3, 'options': ['D', 'E', 'F', 'G']},
        {'select': 1, 'options': ['G', 'H', 'I']},
        {'select': 2, 'options': ['J', 'K', 'L', 'M', 'N', 'G']},
    ];

    describe('Selection check', () => {
        it('returns true for valid selections', () => {
            const selection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'];
            expect(selectionCheck(selection, rules)).to.be.true;
        });

        it('returns false when required selections are missing', () => {
            const selection = ['B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'];
            expect(selectionCheck(selection, rules)).to.be.false;
        });

        it('returns false when there are too few selections for a category', () => {
            const selection = ['A', 'B', 'C', 'D', 'G', 'J', 'K'];
            expect(selectionCheck(selection, rules)).to.be.false;
        });

        it('returns false when there are too few selections for a category (unsure where)', () => {
            const selection = ['A', 'B', 'C', 'E', 'F', 'G', 'J', 'K'];
            expect(selectionCheck(selection, rules)).to.be.false;
        });

        it('returns false when there are invalid selections', () => {
            const selection = ['A', 'B', 'C', 'H', 'E', 'F', 'I', 'J', 'K'];
            expect(selectionCheck(selection, rules)).to.be.false;
        });

        it('returns false when there are invalid selections (selected too many from one group)', () => {
            const selection = ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'Z'];
            expect(selectionCheck(selection, rules)).to.be.false;
        });

        it('returns false when there are too many selections', () => {
            const selection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L'];
            expect(selectionCheck(selection, rules)).to.be.false;
        });
    });

    describe('Selection correction', () => {
        it('returns corrected array when required selections are missing', () => {
            const selection = ['B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'];
            const expected = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'];
            let returned = selectionCorrection(selection, rules);

            assert.sameMembers(returned, expected, 'Arrays do not match');
        });

        it('returns corrected array when there are too few selections for a category (1)', () => {
            const selection = ['A', 'B', 'C', 'D', 'G', 'J', 'K'];
            const expected = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'];
            let returned = selectionCorrection(selection, rules);

            assert.sameMembers(returned, expected, 'Arrays do not match');
        });

        it('returns corrected array when there are too few selections for a category (2)', () => {
            const selection = ['A', 'B', 'C', 'E', 'F', 'G', 'J', 'K'];
            const expected = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K'];
            let returned = selectionCorrection(selection, rules);

            assert.sameMembers(returned, expected, 'Arrays do not match');
        });

        it('returns corrected array when there are invalid selections (1)', () => {
            const selection = ['A', 'B', 'C', 'H', 'E', 'F', 'I', 'J', 'K'];
            const expected = [
                ['A', 'B', 'C', 'H', 'E', 'F', 'D', 'J', 'K'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'K'],
                ['A', 'B', 'C', 'I', 'E', 'F', 'D', 'J', 'K'],
                ['A', 'B', 'C', 'I', 'E', 'F', 'G', 'J', 'K']
            ];
            let returned = selectionCorrection(selection, rules);

            let matchesOne = expected.some(arr => arrEqualityCheck(arr, returned));
            expect(matchesOne).to.be.true;
        });

        it('returns corrected array when there are invalid selections (2)', () => {
            const selection = ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'Z'];
            const expected = [
                ['A', 'B', 'C', 'H', 'E', 'F', 'D', 'J', 'K'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'D', 'J', 'L'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'D', 'J', 'M'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'D', 'J', 'N'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'D', 'J', 'G'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'K'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'L'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'M'],
                ['A', 'B', 'C', 'H', 'E', 'F', 'G', 'J', 'N'],
                ['A', 'B', 'C', 'G', 'E', 'F', 'D', 'J', 'K'],
                ['A', 'B', 'C', 'G', 'E', 'F', 'D', 'J', 'L'],
                ['A', 'B', 'C', 'G', 'E', 'F', 'D', 'J', 'M'],
                ['A', 'B', 'C', 'G', 'E', 'F', 'D', 'J', 'N'],
            ];
            let returned = selectionCorrection(selection, rules);

            let matchesOne = expected.some(arr => arrEqualityCheck(arr, returned));
            expect(matchesOne).to.be.true;
        });

        it('returns corrected array when there are too many selections', () => {
            const selection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L'];
            const expected = [
                ['A', 'B', 'C', 'G', 'D', 'E', 'F', 'J', 'K'],
                ['A', 'B', 'C', 'G', 'D', 'E', 'F', 'J', 'L'],
                ['A', 'B', 'C', 'G', 'D', 'E', 'F', 'K', 'L']
            ];
            let returned = selectionCorrection(selection, rules);

            let matchesOne = expected.some(arr => arrEqualityCheck(arr, returned));
            expect(matchesOne).to.be.true;
        });
    });
});
