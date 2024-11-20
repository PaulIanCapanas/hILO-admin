import { addDoc, collection, CollectionReference } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

export default async function uploadDocument(
  collectionName: string,
  data: object,
  subcollection?: string
): Promise<string> {
  let collectionRef: CollectionReference;
  if (!subcollection) {
    collectionRef = collection(firestore, collectionName);
  } else {
    collectionRef = collection(firestore, subcollection, collectionName);
  }

  return addDoc(collectionRef, data)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      throw error;
    });
}
