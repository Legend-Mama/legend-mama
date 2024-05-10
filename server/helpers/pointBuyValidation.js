
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

export default function pointBuyValidation(scores) {
    if (!pointBuyCheck(scores)) {
        return pointBuyCorrection(scores);
    }

    return scores;
}

export function pointBuyCheck(scores) {
    let points = 27;
    let cost;
    for (const ability in scores) {
        cost = pointBuyCost[scores[ability]];
        if (cost !== undefined) {
            points -= cost;
            if (points < 0) {
                console.log("Point Buy Validation - Too many points used!");
                return false;
            }
        } else {
            console.log(`Point Buy Validation - Invalid score for ${ability}`);
            return false;
        }
    }

    if (points > 0) {
        console.log(`Point Buy Validation - Unused points: ${points}`);
        return false;
    }

    return true;
}

export function pointBuyCorrection(scores) {
    const sortedScores = Object.entries(scores);
    sortedScores.sort((a, b) => b[1] - a[1]);

    let greedy, name, val, cost, tmp, points;
    let extra = 0;
    do {
        points = 27;
        greedy = {'strength': 8, 'dexterity': 8, 'constitution': 8, 'intelligence': 8, 'wisdom': 8, 'charisma': 8};
        for (let score of sortedScores) {
            [name, val] = score;
            val = Math.min(15, val);

            // Check if we have extra points
            if (extra > 0) {
                tmp = Math.min(15, val+extra);
                extra -= tmp - val;
                val = tmp;
            }

            cost = pointBuyCost[val];

            if (((points - cost) < 0) && (points > 0)) {
                // If we don't have enough points to cover the cost, but still have points left, dump remaining points
                val = parseInt(Object.keys(pointBuyCost).find(key => pointBuyCost[key] === points));
            } else if (points <= 0) {
                // No more points to give, leave
                break;
            }

            points -= cost;
            greedy[name] = val;
        }
        extra = points;
    } while (points > 0);

    return greedy;
}