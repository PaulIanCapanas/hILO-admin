import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function queryAllDocument(collectionName: string) {
  const collectionRef = collection(firestore, collectionName);

  try {
    const querySnapShot = await getDocs(collectionRef);
    return querySnapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Failed to fetch data", error);
    return []
  }
}