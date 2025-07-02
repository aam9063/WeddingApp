import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/firebase.config"

// Add a new document with a generated id.
export  const createGuest = async () => {
    const docRef = await addDoc(collection(db, "guests"), {
        name: "albert",
        surname: "Alarcón",
        email: "albert9063@gmail.com",
        photos: [],
        token: "",
        assistance: false,
        accompanist: false,
        comment: ""
      });

    console.log("Document written with ID: ", docRef.id);

    return docRef.id;
}