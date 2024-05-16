import {nRandomIndices} from "./utilities.js";

/**
 * Performs check of selections against rules. If there is an issue, it will return a corrected set of selections.
 * @param selection - selections to check
 * @param rules - array of required selections and choices. Choices are objects with 'select' and 'options' which dictate how many of the options must be selected.
 * @returns {any[]} - original selections if no errors were found, otherwise a corrected set is returned
 */
export default function selectionValidation(selection, rules) {
    if (!selectionCheck(selection, rules)) {
        return selectionCorrection(selection, rules);
    }

    return selection;
}

/**
 * Attempts to reconcile problems in the provided selections with requirements from rules. For rules that offer choices, it will greedily add selections that match the choice's criteria.
 * @param selection - selections to reconcile with rules
 * @param rules - array of required selections and choices. Choices are objects with 'select' and 'options' which dictate how many of the options must be selected.
 * @returns {any[]} - updated selections that satisfy rules
 */
export function selectionCorrection(selection, rules) {
    const maxAttempts = 20;

    // Find required selections
    const requiredSelections = rules.filter(el => el?.select === undefined);

    // Remove required selections
    let choices = rules.filter(el => !requiredSelections.includes(el));

    // Make selections starting with choices with the fewest rules
    choices.sort((a, b) =>  a.options.length*(a.options.length-a.select) - b.options.length*(b.options.length-b.select));
    let matches,remaining, inds, greedy, sel, tryAgain;
    let cnt = 0;
    do {
        // Reset
        cnt += 1;
        tryAgain = false;
        greedy = new Set(requiredSelections);

        // If we haven't found a solution after half of the available attempts, stop trying to use the provided selections
        if (cnt > Math.floor(maxAttempts/2)) {
            sel = [];
        } else {
            sel = Array.from(new Set(selection));
        }

        for (let choice of choices) {
            // Find matches between the current set of options and provided selections
            sel = sel.filter(el => !greedy.has(el));
            matches = choice.options.filter(el => sel.includes(el));

            if (matches.length < choice.select) {
                // If too few selections were made for this choice, randomly select from remaining choices set
                remaining = choice.options.filter(el => !greedy.has(el)).filter(el => !matches.includes(el));
                inds = nRandomIndices(choice.select - matches.length, remaining.length);
                inds.forEach(ind => matches.push(remaining[ind]));
            }

            if (matches.length < choice.select) {
                console.log('Selection Validation - Could not make enough selections');
                tryAgain = true;
                break;
            }

            // Add selections to greedy set
            matches.slice(0, choice.select).forEach(el => greedy.add(el));
        }
    } while (tryAgain && (cnt < maxAttempts));

    if (cnt === maxAttempts) {
        throw new Error(`Selection Validation - Could not find a valid selection, check rules\nProvided Selection: ${JSON.stringify(selection)}\nRules: ${JSON.stringify(rules)}`)
    }

    return Array.from(greedy);
}

/**
 * Checks that selections satisfy rules. Console will log the reason why selection is invalid.
 * @param selection - selections to check against rules
 * @param rules - array of required selections and choices. Choices are objects with 'select' and 'options' which dictate how many of the options must be selected.
 * @returns {boolean} - true if valid, false otherwise
 */
export function selectionCheck(selection, rules) {
    selection = Array.from(new Set(selection));

    // Check selection isn't missing required selections
    const missingRequiredSelections = rules.filter(el => el?.select === undefined).filter(el => !selection.includes(el));
    if (missingRequiredSelections.length > 0) {
        console.log('Selection Validation - Missing required selections');
        return false;
    }

    // Remove required selections
    let choices = rules.filter(el => !selection.includes(el));
    let sel = selection.filter(el => !rules.includes(el));

    // Check rules that offer choices
    let total = 0;
    let matches = new Set([]);
    for (let choice of choices) {
        total += choice.select;

        // Check that there aren't too few selections for this choice
        if (choice.select > choice.options.reduce((count, el) => count +  sel.includes(el), 0)) {
            console.log('Selection Validation - Too few selections');
            return false;
        }

        // Track selections that have matched
        choice.options.forEach(el => sel.includes(el) ? matches.add(el) : el);
    }

    // Check for too few selections in last choice
    if (sel.length < total) {
        console.log('Selection Validation - Too few selections');
        return false;
    }

    // Check that there aren't any selections that didn't match any of the options across all choices
    if (sel.length > matches.size) {
        console.log('Selection Validation - Invalid selections');
        return false;
    }

    // Check that there aren't too many selections
    if (sel.length > total) {
        console.log('Selection Validation - Too many selections');
        return false;
    }

    return true;
}