// TODO: Add Simplify Debt Algo here

// * 3 ways to split: Exact, Equal, Percentage
// * Can Create Expense class, extend the 3 ways out of Expense Class

// * Function for simplifying all debts in a nested array of numbers 
// @params transactions -> nested array of numbers [ ['from','to', 'amount'], ['from','to','amount'] ]

export default function simplifyDebt(transactions : number[][]) {
    const memberVsBalanceObj: { [key: number] : number } = {};

    // Compute overall balance: (incoming, outgoing) for each member
    for (const txn of transactions) {

        let from: number = txn[0];
        let to: number = txn[1];
        let amount: number = txn[2];

        memberVsBalanceObj[from] = (memberVsBalanceObj[from] || 0) - amount;
        memberVsBalanceObj[to] = (memberVsBalanceObj[to] || 0) + amount;

    }

    // Put balance into balance list

    const balances: number[] = [];
    for (const amt of Object.values(memberVsBalanceObj)) {
        if (amt != 0) {
            balances.push(amt);
        }
    }
    
    return;
}