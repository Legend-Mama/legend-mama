/**
 * Returns n random indices from 0 to arrLen. Utilizes a Fisher Yates Shuffle to generate a random array and
 * then returns the first n values. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param n - number of indices to return
 * @param arrLen - length of array to index
 * @returns {number[]} - n random indices
 */
function nRandomIndices(n, arrLen) {
    let arr = Array.from(Array(arrLen).keys());
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, n);
}

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
    // Add required selections to greedy set
    selection = Array.from(new Set(selection));
    const requiredSelections = rules.filter(el => el?.select === undefined);
    let greedy = new Set(requiredSelections);

    // Remove required selections
    let choices = rules.filter(el => !requiredSelections.includes(el));
    let sel = selection.filter(el => !requiredSelections.includes(el));

    // Make selections starting with choices with the fewest rules
    let matches,remaining, inds;
    choices.sort((a, b) => a.options.length - b.options.length);
    for (let choice of choices) {
        // Find matches between the current set of choiceions and provided selections
        matches = choice.options.filter(el => sel.includes(el)).filter(el => !greedy.has(el));

        if (matches.length < choice.select) {
            // If too few selections were made for this choice, randomly select from remaining choices set
            remaining = choice.options.filter(el => !greedy.has(el)).filter(el => !matches.includes(el));
            inds = nRandomIndices(choice.select-matches.length, remaining.length);
            inds.forEach(ind => matches.push(remaining[ind]));
        } else if (matches.length > choice.select) {
            // If there are more matches than available selections, randomly choose from the matches
            // TODO: might need to look ahead first to find shared values across sets... hopefully starting with the fewest options avoid collisions
            inds = nRandomIndices(matches.length-choice.select, matches.length);
            inds.forEach(ind => matches.splice(ind,ind));
        }

        // Add selections to greedy set
        matches.slice(0, Math.min(choice.select, matches.length)).forEach(el => greedy.add(el));
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
        console.log('Missing required selections');
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
            console.log('Too few selections');
            return false;
        }

        // Track selections that have matched
        choice.options.forEach(el => sel.includes(el) ? matches.add(el) : el);
    }

    // Check for too few selections in last choice
    if (sel.length < total) {
        console.log('Too few selections');
        return false;
    }

    // Check that there aren't any selections that didn't match any of the options across all choices
    if (sel.length > matches.size) {
        console.log('Invalid selections');
        return false;
    }

    // Check that there aren't too many selections
    if (sel.length > total) {
        console.log('Too many selections');
        return false;
    }

    return true;
}