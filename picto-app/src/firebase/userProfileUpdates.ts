import { updateProfile } from "firebase/auth"
import { auth } from "./firebase"
// import { useAuth } from "@/authContext/authContext"


export const updateUserName = async (newName : string) => {
    const currentUser = auth.currentUser; 
    if(currentUser!=null)  await updateProfile(currentUser ,{displayName:newName})
}

export const updateUserProfilePic = async (newPicture : string) => {
    const currentUser = auth.currentUser; 

  if(currentUser)  await updateProfile(currentUser ,{photoURL:newPicture})
}