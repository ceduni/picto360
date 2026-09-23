import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, type Auth } from "firebase/auth";

/**
 * Firebase est optionnel: sans configuration, les fonctions d'authentification
 * rejettent proprement au lieu de faire planter l'application.
 */
const requireAuth = (): Auth => {
    if (!auth) {
        throw new Error("Firebase n'est pas configuré (clés VITE_FIREBASE_* absentes)");
    }
    return auth;
}

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(requireAuth(), email, password)
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
      return signInWithEmailAndPassword(requireAuth(), email, password);
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
      signInWithPopup(requireAuth(), provider),
      timeoutPromise
    ]);

    return result;
}

export const doSignInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("auth/popup-timeout"));
      }, 2000);
    });

  const result = await Promise.race([
    signInWithPopup(requireAuth(), provider),
    timeoutPromise
  ]);

  return result;
}

export const doSignOut = () => {
    return requireAuth().signOut();
}
