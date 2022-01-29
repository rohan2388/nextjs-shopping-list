import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentReference,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const collectionName = "shopping-list";
export const collectionRef = collection(db, collectionName);

export type ShoppingListItem = {
  name: string;
  quantity: string;
};

export const typeCast = (doc: QueryDocumentSnapshot) =>
  doc.data() as ShoppingListItem;

export const useShoppingList = () => {
  const [snapshot, loading] = useCollection(collectionRef);
  const data = snapshot?.docs.map(doc => {
    return {
      id: doc.id,
      data: typeCast(doc),
      ref: doc.ref,
    };
  });
  return [data, loading] as [
    (
      | {
          id: string;
          data: ShoppingListItem;
          ref: DocumentReference<DocumentData>;
        }[]
      | undefined
    ),
    boolean
  ];
};

export const createItem = async (item: ShoppingListItem) => {
  return await setDoc(doc(collectionRef), {
    name: item.name,
    quantity: item.quantity,
    urgent: false,
  });
};

export const getItem = async (id: string) => {
  return await doc(collectionRef, id);
};

export const deleteItem = async (id: string) => {
  return await deleteDoc(await getItem(id));
};
