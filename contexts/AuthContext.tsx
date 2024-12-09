"use client";
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { auth } from "@/firebase/firebaseConfig";
import {
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  User,
} from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        await setPersistence(auth, browserSessionPersistence)
          .then(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser);
              setLoading(false);
            });

            return () => {
              unsubscribe();
            };
          })
          .catch((error) => {
            console.error("Error setting persistence", error);
            setLoading(false);
          });
      }
    };
    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
