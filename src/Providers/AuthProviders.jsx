import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';


export const AuthContext = createContext(null);
const auth = getAuth (app);
const AuthProviders = ({children}) => {
    const [user,setUser] =useState(null);
    const [loading,setLoading] = useState(true);    
    const googleAuthProvider = new GoogleAuthProvider();
    const facebookAuthProvider = new FacebookAuthProvider();
    const createUser =(email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn =(email,password) =>{
        setLoading(true);
       
        return signInWithEmailAndPassword(auth,email,password);
    }
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,googleAuthProvider);
    }
    const facebookSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,facebookAuthProvider);
    }


    const logOut =(email,password) =>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('current User',currentUser)
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
        googleSignIn,
        facebookSignIn,
        logOut,
        updateUserProfile

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;