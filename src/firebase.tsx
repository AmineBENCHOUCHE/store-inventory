// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { PantryItem } from "@/components/PantryGallery";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGleGQbHqUQWuLmpc2p2bdwbE-6RtzvRE",
    authDomain: "hspantryapp-a2fe6.firebaseapp.com",
    projectId: "hspantryapp-a2fe6",
    storageBucket: "hspantryapp-a2fe6.appspot.com",
    messagingSenderId: "583790699986",
    appId: "1:583790699986:web:0b88574aeea2a1567c540b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Creat collection reference
const colRef = collection(db, 'pantry');

//Queries
const queryOrderedByExpirationDate = query(colRef, orderBy('expired_date'));

// Get documents from Firebase in real-time
const getPantryItems = async (): Promise<PantryItem[]> => {
    try {
        const snapshot = await getDocs(colRef); // Fetch initial data

        const pantryList: PantryItem[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as PantryItem));

        console.log("Successfully fetched documents:", pantryList);
        return pantryList;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
};


// Functions to add, delete, and update items in the database
type PantryItemWithoutId = Omit<PantryItem, 'id'>;
const addItem = async ({category,  name, qty, expired_date }: PantryItemWithoutId) => {
    try {
        // check if exists in db
        const docRef = await addDoc(colRef, {
            category,
            name,
            qty,
            expired_date,
        })
        let pantryList: PantryItem[] = []
        pantryList.push({ id: docRef.id, ...{ category, name, qty, expired_date } })
        return pantryList;
        /*
        if (docRef.id in queryOrderedByExpirationDate) {
            console.log("Item already exists in the database", docRef);
        } else {

            await setDoc(docRef, {name, qty: qty++, expired_date});
            console.log("Document successfully added!");
        }*/
    } catch (error) { console.log(error) }


}

//delete
const deleteItem = async (id: string, pantryList: PantryItem[]) => {
    const docRef = doc(colRef, id);
    await deleteDoc(docRef)
    //updatePantry()
    pantryList = pantryList.filter(item => item.id !== id)
    console.log("Document successfully deleted!");
}

//update

const updateItem = async (id: string, updatedItem: PantryItem) => {
    const docRef = doc(colRef, id);
    await setDoc(docRef, updatedItem);
    console.log("Document successfully updated!");
}

const getTodayDate = () => {
    const date = new Date();
    const currentDate = date.toJSON().slice(0, 10);
    return currentDate;
}

export { getPantryItems, addItem, deleteItem, updateItem, getTodayDate }

