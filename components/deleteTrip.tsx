'use client';

import { TripUuid } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import deleteData from '@/lib/firebase/firestore/deleteData';
import deleteTripFromUser from '@/lib/firebase/firestore/deleteTripFromUser';
import { useAuthContext } from '@/app/context/AuthContext';


export default function DeleteTrip( { tripUUID } : TripUuid )  {
    // TODO: Might need to add suspense after deleting a trip
    // get user email for deleting trip from user collection
    const { user } = useAuthContext();
    
    // * Deletes trip from trips collection + own user's trips
    const deleteTrip = async() => {
        // deletes trip from trips collection
        await deleteData('trips', tripUUID);
        // deletes trip from own user's trip
        await deleteTripFromUser( user?.email ?? '',tripUUID);
        setTimeout(() => {
            location.reload();
        },2000);
    }
    
    // * Deletes trip from own user's trips
    const deleteTripForUser = async() => {
        await deleteTripFromUser( user?.email ?? '',tripUUID);
        setTimeout(() => {
            location.reload();
        },2000);
    }

    return (
        <div>
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <button className="text-violet11 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] font-medium leading-none outline-none">
                        <Trash2 size={24} color='red'/>
                    </button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                            This action cannot be undone. This will permanently delete your trip and remove your data from our servers.
                        </AlertDialog.Description>
                        <AlertDialog.Description className="text-red10 mt-4 mb-5 text-[15px] leading-normal">
                            After deleting, please wait for the screen to refresh before proceeding!
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                            <AlertDialog.Cancel asChild>
                                <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 py-5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    Cancel
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button onClick={deleteTrip} className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 py-5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    For Everyone
                                </button>
                            </AlertDialog.Action>
                            <AlertDialog.Action asChild>
                                <button onClick={deleteTripForUser} className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 py-5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    For Me
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    )
}
