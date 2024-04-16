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
                        <div key={index}>{logObj.desc}</div>
                    ))}
                    <Table.Row>
                        <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                        <Table.Cell>danilo@example.com</Table.Cell>
                        <Table.Cell>Developer</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                    <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                    <Table.Cell>zahra@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                    <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                    <Table.Cell>jasper@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table.Root>
        </>
    )
}