'use client';

import React from "react";
import { ReactNode } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/components/firebase/config";

const auth = getAuth(firebase_app);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = React.createContext({} as { user: User | null });

// export const useAuthContext = () => React.useContext(AuthContext);
export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
  };
  

export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, []);
    
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div>: children}
        </AuthContext.Provider>
    );
    
}