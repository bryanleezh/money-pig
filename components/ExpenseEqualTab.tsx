'use client';

import { Tab } from "@headlessui/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ExpenseEqualTab() {
    // TODO: Add tab for equal expense
    // return (
    //     <Tab.Panel className={classNames(
    //             'rounded-xl p-3',
    //             'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
    //         )}
    //     >
    //         <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse sm:px-6">
    //             <button
    //                 type="submit"
    //                 className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    //                 onClick={submitEqualExpense}
    //             >
    //                 Add Expense!
    //             </button>
    //             <button
    //             type="button"
    //             className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
    //             onClick={closeModal}
    //             >
    //                 Cancel
    //             </button>
    //         </div>
    //     </Tab.Panel>
    // )
}