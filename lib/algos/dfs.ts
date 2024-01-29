// * This function is used to run through all balances in a list to simplify the number of total transactions among members

export default function dfs( balanceList: number[], currentIndex: number) {

    // * edge cases
    if (balanceList.length == 0 || currentIndex >= balanceList.length) return 0;

    if (balanceList[currentIndex] == 0) {
        return dfs(balanceList, currentIndex + 1);
    }

    const currentVal: number = balanceList[currentIndex];
    let minTxnCount: number = Number.MAX_VALUE;

    for (let txnIndex = currentIndex + 1; txnIndex < balanceList.length; txnIndex++) {
        let nextVal = balanceList[txnIndex];

        if (currentVal * nextVal < 0) {
            balanceList[txnIndex] = currentVal + nextVal;
            minTxnCount = min(minTxnCount, 1 + dfs(balanceList, currentIndex + 1));
            balanceList[txnIndex] = nextVal;

            if (currentVal + nextVal == 0) {
                break;
            }
        }
    }

    return minTxnCount;
    
}

function min(...values: number[]): number {
    if (values.length === 0) {
        throw new Error("Cannot find minimum of empty list.");
    }
    let minValue = values[0];
    for (let i = 1; i < values.length; i++) {
        if (values[i] < minValue) {
            minValue = values[i];
        }
    }
    return minValue;
}
