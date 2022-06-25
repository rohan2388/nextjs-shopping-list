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
  Timestamp,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
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
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch(err => {
    console.log(`Firebase offline failed: ${err.code}`);
  });
}
export const collectionName = "shopping-list";
export const collectionRef = collection(db, collectionName);

export type ShoppingListItem = {
  name: string;
  quantity: string;
  urgent: boolean;
  createdAt: Timestamp;
};

export type ShoppingListItemSnapshot = {
  id: string;
  data: ShoppingListItem;
  ref: DocumentReference<DocumentData>;
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
  data?.sort(
    (a, b) => a.data.createdAt.toMillis() - b.data.createdAt.toMillis()
  );
  return [data, loading] as [ShoppingListItemSnapshot[] | undefined, boolean];
};

export const createItem = async (item: Omit<ShoppingListItem, "createdAt">) => {
  return await setDoc(doc(collectionRef), {
    ...item,
    ...{
      createdAt: Timestamp.now(),
    },
  });
};

export const getItem = async (id: string) => {
  return await doc(collectionRef, id);
};

export const deleteItem = async (id: string) => {
  return await deleteDoc(await getItem(id));
};

export const useFirebaseAuth = function () {
  type UserState = {
    uid: string;
    email: string;
  };
  const auth = useMemo(() => getAuth(app), []);
  const [authUser, setAuthUser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);

  const formatAuthUser = useCallback(
    (user: User) =>
      ({
        uid: user.uid,
        email: user.email,
      } as UserState),
    []
  );

  const authStateChanged = useCallback(
    async (authState: User | null) => {
      setLoading(true);
      if (!authState) {
        setAuthUser(null);
        setLoading(false);
      } else {
        setAuthUser(formatAuthUser(authState));
        setLoading(false);
      }
    },
    [formatAuthUser]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, [authStateChanged, auth]);

  const signIn = useCallback(async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }, [auth]);

  const getResult = useCallback(async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
      }
    } catch (error) {}
  }, [auth]);

  return {
    user: authUser,
    isLoading: loading,
    singOut: () => getAuth(app).signOut(),
    signIn,
    getResult,
  };
};
