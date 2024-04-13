"use client";

import { LogObj } from '@/lib/types';
import React from 'react';

export default function ExpenseLog(data : LogObj)  {
    console.log(data);
    return (
        <div>ExpenseLog</div>
    )
};