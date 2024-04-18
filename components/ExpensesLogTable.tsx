"use client";

import { ExpensesLogTableProps, LogObj } from '@/lib/types';
import { Table } from '@radix-ui/themes';
import { Trash2 } from 'lucide-react';

export default function ExpensesLogTable( {data} : ExpensesLogTableProps) {
    console.log(data);

    const formatTimeStamp = (timeStamp : {nanoseconds: number, seconds: number}) => {
        const date = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000);
        return date.toUTCString();
    }

    return (
        <>
            <p className="text-gray-500 dark:text-gray-400 w-auto sm:w-auto">
                All Expenses
            </p>
            <div className="overflow-x-auto">
                <table className="border-collapse w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Index</th>
                            <th className="border border-gray-400 px-4 py-2">Description</th>
                            <th className="border border-gray-400 px-4 py-2">Amount</th>
                            <th className="border border-gray-400 px-4 py-2">Currency</th>
                            <th className="border border-gray-400 px-4 py-2">Paid For</th>
                            <th className="border border-gray-400 px-4 py-2">Paid By</th>
                            <th className="border border-gray-400 px-4 py-2">Timestamp</th>
                            <th className="border border-gray-400 px-4 py-2">Transaction Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((logobj: LogObj, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-400 px-4 py-2">{logobj.desc}</td>
                                <td className="border border-gray-400 px-4 py-2">{logobj.log.amount}</td>
                                <td className="border border-gray-400 px-4 py-2">{logobj.log.currency}</td>
                                <td className="border border-gray-400 px-4 py-2">{logobj.log.paidFor.join(', ')}</td>
                                <td className="border border-gray-400 px-4 py-2">{logobj.log.paidBy}</td>
                                <td className="border border-gray-400 px-4 py-2">{formatTimeStamp(logobj.timeStamp)}</td>
                                <td className="border border-gray-400 px-4 py-2">{logobj.transactionType}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {/* Refactor to delete expense */}
                                    <button className="text-violet11 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] font-medium leading-none outline-none">
                                        <Trash2 size={24} color='red'/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}