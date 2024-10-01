import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';


export const AuthContext = createContext(null);
const auth = getAuth (app);
const AuthProviders = ({children}) => {
    const [user,setUser] =useState(null);
    const [loading,setLoading] = useState(true);    

    const createUser =(email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn =(email,password) =>{
        setLoading(true);
        return signInWithCredential(auth,email,password);
    }
    const logOut =(email,password) =>{
        setLoading(true);
        return signOut(auth);
    }
    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        });
        return () =>{
            return unsubscribe ();
        }
    },[])
    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        logOut

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;