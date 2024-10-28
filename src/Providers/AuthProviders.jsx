import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleAuthProvider = new GoogleAuthProvider();
    const facebookAuthProvider = new FacebookAuthProvider();
    const axiosPublic = useAxiosPublic();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }
    const facebookSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookAuthProvider);
    }


    const logOut = (email, password) => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            
                if(currentUser){
                    const userInfo ={email: currentUser?.email}
                    axiosPublic.post('/jwt', userInfo)
                    .then(res =>{
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }
                    })
                }
                else{
                    localStorage.removeItem('access-token')
                    setLoading(false)
                }
                setUser(currentUser)
                setLoading(false)
           
        })
        return () =>{
            unSubscribe()
        }
    },[axiosPublic])
    
    const authInfo = {
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