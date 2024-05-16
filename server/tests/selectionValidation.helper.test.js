import {expect, assert} from 'chai';
import selectionValidation, {selectionCheck, selectionCorrection} from '../helpers/selectionValidation.js';
import {getRandomInt, nRandomIndices} from "../helpers/utilities.js";

function randomSelectionRules() {
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const maxSample = 15;
    const maxRequired = 5;
    const maxSelctionsPerRule = 5;
    const maxOptionsPerRule = 10;

    // Start with a sample which will be our *at minimum* one selection from rules
    let inds, n;
    let sample = [];
    n = getRandomInt(1, maxSample);
    inds = nRandomIndices(n, letters.length);
    inds.forEach(ind => sample.push(letters[ind]));

    // Select some of the sample to be required
    n = getRandomInt(1, Math.min(maxRequired, sample.length));
    let rules = sample.splice(0, n);

    let select, options, cnt, ind;
    while (sample.length > 0) {
        select = getRandomInt(1, Math.min(sample.length, maxSelctionsPerRule));
        options = sample.splice(0, select);

        n = getRandomInt(1, maxOptionsPerRule - options.length);
        cnt = 0;
        do {
            ind = getRandomInt(0, letters.length-1);
            if (!options.includes(letters[ind])) {
                options.push(letters[ind]);
                cnt += 1;
            }
        } while (cnt < n)

        rules.push({select: select, options: options});
    }

    return rules;
}

function validSelections(selectionRules) {
    let selections = selectionRules.filter(el => el?.options === undefined);
    let rules = selectionRules.filter(el => el?.options !== undefined);

    let options;
    let totalSelections = selections.length;
    for (let rule of rules) {
        options = rule.options.slice(0, rule.select);
        totalSelections += rule.select;
        selections = selections.concat(options);
    }

    if (totalSelections !== selections.length) {
        console.log("WARNING: Could not find valid selection!");
    }

    return selections;
}

function invalidSelections() {
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const select = getRandomInt(1, 15);
    const inds = nRandomIndices(select, letters.length);
    let selections = [];
    inds.forEach(ind => selections.push(letters[ind]));

    return selections;
}

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

        it('returns corrected array when there are too few selections for a category', () => {
            const selection = ['A', 'B', 'C', 'D', 'G', 'J', 'K'];
            const expected = [
                ['A', 'B', 'C', 'D', 'G', 'E', 'H', 'J', 'K'],
                ['A', 'B', 'C', 'D', 'G', 'F', 'H', 'J', 'K'],
                ['A', 'B', 'C', 'D', 'G', 'E', 'I', 'J', 'K'],
                ['A', 'B', 'C', 'D', 'G', 'F', 'I', 'J', 'K']
            ];
            let returned = selectionCorrection(selection, rules);

            let matchesOne = expected.some(arr => arrEqualityCheck(arr, returned));
            expect(matchesOne).to.be.true;
        });

        it('returns corrected array when there are invalid selections', () => {
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

    describe("Random Testing", () => {
        const n = 5000;
        let selections, returned, title, rules;
        for (let i = 0; i < n; i++) {
            title = `Random Test Iteration ${i+1} - Valid Selections`;
            it(title, () => {
                rules = randomSelectionRules();
                selections = validSelections(rules);
                returned = selectionValidation(selections, rules);
                assert.sameMembers(returned, selections, `Bad Selection\nRules: ${JSON.stringify(rules)}\nSelection: ${JSON.stringify(selections)}`);
            });
        }

        for (let i = 0; i < n; i++) {
            title = `Random Test Iteration ${i+1} - Invalid Selections`;
            it(title, () => {
                rules = randomSelectionRules();
                selections = invalidSelections();
                returned = selectionValidation(selections, rules);
                expect(selectionCheck(returned, rules), `Rules: ${JSON.stringify(rules)}\nSelections before correction: ${JSON.stringify(selections)}\nSelections after correction: ${JSON.stringify(returned)}`).to.be.true;

            });
        }
    });
});
