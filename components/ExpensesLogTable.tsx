"use client";

import { ExpensesLogTableProps, LogObj } from '@/lib/types';
import {Table} from '@radix-ui/themes';

export default function ExpensesLogTable( {data} : ExpensesLogTableProps) {
    console.log(data);
    return (
        <>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell className='w-[100px]'>Full name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Currency</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Paid by</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Paid for</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='text-right'>Timestamp</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((logObj: LogObj, index) => (
                        <Table.Row key={index}>
                            <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                            <Table.Cell>{logObj.desc}</Table.Cell>
                            <Table.Cell>{logObj.log.amount}</Table.Cell>
                            <Table.Cell>{logObj.log.currency}</Table.Cell>
                            <Table.Cell>{logObj.log.paidBy}</Table.Cell>
                            <Table.Cell>{logObj.log.paidFor}</Table.Cell>
                            <Table.Cell>{logObj.log.transactionType}</Table.Cell>
                            {/* TODO: Add timeStamp from calculation of nanoseconds and seconds */}
                            {/* <Table.Cell>{logObj.log.timeStamp}</Table.Cell> */}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}