'use server';

import { db } from "@/firebase.config";
import { addDoc, collection } from "firebase/firestore";

interface Guest {
    name: string;
    surname: string;
    email: string;
    token: string;
    assistance: boolean;
    accompanist: boolean;
    accompanistName?: string;
    accompanistMenuChoice?: string; // ⬅️ NUEVO
    children?: boolean;
    childrenNames?: string;
    childrenMenu?: string; // ⬅️ NUEVO
    bus?: boolean;
    allergies?: boolean;
    allergyDetails?: string;
    menuChoice?: string;
    songRequest?: string;
    comments?: string;
    createdAt?: string;
}

export const createGuest = async (newGuest: Guest) => {
    // get a reference to the guests collection
    const collectionRef = collection(db, 'guests');
    
    // Add timestamp
    const guestWithTimestamp = {
        ...newGuest,
        createdAt: new Date().toISOString()
    };
    
    //add a new document with the newGuest data
    const docRef = await addDoc(collectionRef, guestWithTimestamp);
    // return the ID of the new document
    return docRef.id;
}