import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

export default async function uploadDocumentToSubCol(
  collectionName: string,
  docId: string,
  subCollectionName: string,
  data: object
): Promise<string> {
  const documentRef = doc(firestore, collectionName, docId);
  const collectionRef = collection(documentRef, subCollectionName);

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
