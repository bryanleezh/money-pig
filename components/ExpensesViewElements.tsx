'use client';

import React from "react";
import { ElementsObj, ExpenseObj } from "@/lib/types";

export default function ExpensesViewElements ( {type, data} : ElementsObj ) {
    
    const currencyElements = (elements: ExpenseObj | null) => {
        return elements ? Object.entries(elements).map(([currency, expense]) => {
            return (
                <div key={currency} className="flex items-center justify-between p-4">
                    <h3 className="font-medium">{currency}</h3>
                    <span>{String(expense)}</span>
                </div>
            )
        }) : null;
    }
    
    if (type == "total") {
        const totalExpenseElements = data ? Object.entries(data).map(([currency, expense], index) => {
            if (index % 2 == 0) {
                return (
                    <div key={currency} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                        <h3 className="font-medium">{currency}</h3>
                        <span>{String(expense)}</span>
                    </div>
                )
            } else {
                return (
                    <div key={currency} className="flex items-center justify-between p-4">
                        <h3 className="font-medium">{currency}</h3>
                        <span>{String(expense)}</span>
                    </div>
                )
            }
        }) : null;
        
        return totalExpenseElements;
    } else if (type == "usersExpense") {
        // TODO: add tsx for type
        const usersExpenseElements = data ? Object.entries(data).map(([user, expenseObj], index) => {
            if (index % 2 == 0) {
                return (
                    <div key={user} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-950">
                        <h3 className="font-medium">{user}</h3>
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {currencyElements(expenseObj as unknown as ExpenseObj)}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={user} className="flex items-center justify-between p-4">
                        <h3 className="font-medium">{user}</h3>
                        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800">
                            {currencyElements(expenseObj as unknown as ExpenseObj)}
                        </div>
                    </div>
                )
            }
        }) : null;

        return usersExpenseElements;
    } else if (type == "usersExpensePaid") {
        // TODO: add tsx for type
        return null;
    }
    
}