'use server';

import { db } from "@/firebase.config";
import { addDoc, collection } from "firebase/firestore";

interface Guest {
    name: string;
    surname: string;
    email: string;
    assistance: boolean;
    accompanist: boolean;
    token: string;
}

export const createGuest = async (newGuest: Guest) => {
    // get a reference to the guests collection
    const collectionRef = collection(db, 'guests');
    //add a new document with the newGuest data
    const docRef = await addDoc(collectionRef, newGuest);
    // return the ID of the new document
    return docRef.id;
}