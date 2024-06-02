/**
 * Returns n random indices from 0 to arrLen. Utilizes a Fisher Yates Shuffle to generate a random array and
 * then returns the first n values. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param n - number of indices to return
 * @param arrLen - length of array to index
 * @returns {number[]} - n random indices
 */
export function nRandomIndices(n, arrLen) {
    let arr = Array.from(Array(arrLen).keys());
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, n);
}

/**
 * Get random integer between two values, inclusive
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 * @param min
 * @param max
 * @returns {number}
 */
export function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export function newDaySinceDate(date) {
    const now = new Date();
    const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const providedDate = new Date(date);
    const utcProvidedDate = Date.UTC(providedDate.getUTCFullYear(), providedDate.getUTCMonth(), providedDate.getUTCDate());

    return utcProvidedDate < utcNow;
}