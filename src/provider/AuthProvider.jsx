
import { createContext, useEffect, useState } from 'react';
import {
      GoogleAuthProvider,
      createUserWithEmailAndPassword,
      getAuth,
      onAuthStateChanged,
      sendPasswordResetEmail,
      signInWithEmailAndPassword,
      signInWithPopup,
      signOut,
      updateProfile,
} from '@firebase/Auth';
import { app } from '../firebase/firebase.config';



export const authContext = createContext(null);

const auth = getAuth(app);

// Rest of your AuthProvider code...

const AuthProvider = ({ children }) => {

      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)

      const googleProvider = new GoogleAuthProvider();

      const createUser = (email, password) => {
            setLoading(true);
            return createUserWithEmailAndPassword(auth, email, password)
      }

      const logIn = (email, password) => {
            setLoading(true);
            return signInWithEmailAndPassword(auth, email, password)
      }

      const logout = () => {
            setLoading(true)
            return signOut(auth)
      }
      const updateUserProfile = (name, photo) => {
            setLoading(true)
            return updateProfile(auth.currentUser, {
                  displayName: name, photoURL: photo
            })
      }

      const googleSignIn = () => {
            setLoading(true)
            return signInWithPopup(auth, googleProvider)
      }
      useEffect(() => {
            const unsuscribed = onAuthStateChanged(auth, currentUser => {
                  setUser(currentUser)
                  // console.log("CurentUser:-", currentUser);

                  setLoading(false)
            })
            return () => {
                  return unsuscribed;
            }
      }, [])

      const authInfo = {
            user,
            loading,
            createUser,
            logIn,
            logout,
            updateUserProfile,
            googleSignIn,
      }
      return (
            <authContext.Provider value={authInfo}>
                  {children}
            </authContext.Provider>
      );
};

export default AuthProvider;