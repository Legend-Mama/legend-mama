
export function newDaySinceDate(date) {
    const now = new Date();
    const utcNow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const providedDate = new Date(date);
    const utcProvidedDate = Date.UTC(providedDate.getUTCFullYear(), providedDate.getUTCMonth(), providedDate.getUTCDate());

    return utcProvidedDate < utcNow;
}