import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
      return signInWithEmailAndPassword(auth, email, password);
}

export const doSighInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  //disable auto-connect
  provider.setCustomParameters({
      prompt:'select_account'
  })

  // Create a promise for a custom timeout
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("auth/popup-timeout"));
    }, 2000); // We will timeout after 3 seconds
  });

    const result = await Promise.race([
      signInWithPopup(auth, provider),
      timeoutPromise
    ]);
    
    return result;    
}

export const doSignInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    prompt:'select_account'
  })

  const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("auth/popup-timeout"));
      }, 2000); // We will timeout after 3 seconds
    });

  const result = await Promise.race([
    signInWithPopup(auth, provider),
    timeoutPromise
  ]);
  return result;
}

export const doSignOut = () => {
    return auth.signOut();
}
