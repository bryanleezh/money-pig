// TODO: add delete button using deleteData.ts, with props in the button with the trip uuid
// can be used for deleting trip and also expense maybe? but might have to be seperate deleteData.ts function
import { TripUuid } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import React from 'react';


export default function deleteTrip( {tripUUID} : TripUuid )  {

    const deleteTrip = async() => {
        
    }

    return (
        <div>
            <Trash2 size={24} color='red' onClick={deleteTrip}/>
        </div>
    )
}
