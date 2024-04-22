"use client";

import { IndivActivityProps } from "@/lib/types";
import { Eraser, PencilLine } from "lucide-react";

export default function IndivActivity( {data, type}: IndivActivityProps ) {
    if (type == "create") {
        return (
            <>
                <div className='col-start-2 row-span-2 flex flex-col items-center pt-2 pr-10'>
                    <PencilLine size={48} color='#41af67' />
                </div>
                <div className='col-span-2'>
                    <h2 className="mb-1 block text-xl font-bold text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                        {data.desc}
                    </h2>
                </div>
                <div className="col-start-3 row-start-2 col-span-2">
                    <h3 className="text-base font-semibold text-primary leading-relaxed text-body-color dark:text-primary">
                        {data.activityType}
                    </h3>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='col-start-2 row-span-2 flex flex-col items-center pt-2 pr-10'>
                    <Eraser size={48} color='#af4141' />
                </div>
                <div className='col-span-2'>
                    <h2 className="mb-1 block text-xl font-bold text-primary hover:text-primary dark:text-cyan-200 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                        {data.desc}
                    </h2>
                </div>
                <div className="col-start-3 row-start-2 col-span-3">
                    <h3 className="text-base font-semibold text-primary leading-relaxed text-body-color dark:text-primary">
                        {data.activityType}
                    </h3>
                </div>
            </>
        )
    }
}