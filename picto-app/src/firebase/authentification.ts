import { error } from "console";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSighInWithGoogle = async (acountType:any) => {
    const provider = new GoogleAuthProvider();
    //disable auto-connect
    provider.setCustomParameters({
        prompt:'select_account'
    })

  try {
    const result = (await signInWithPopup(auth, provider));

    return result;
  } catch (error: any) {
    // 👇 Handle specific error if user closed the popup
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('Popup closed by user.');
    } else {
      console.error('Google Sign-In Error:', error);
    }
    throw error; // Let your component handle cleanup
  }
}

export const doSignInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    prompt:'select_account'
  })

  try{
    const result = (await signInWithPopup(auth,provider));
    
    return result;
  }catch(error:any){
    console.log(error)
    throw error;
  } 
}

export const doSignOut = () => {
    return auth.signOut();
}