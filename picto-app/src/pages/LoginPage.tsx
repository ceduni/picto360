import { useAuth } from "@/authContext/authContext";
import "./css/LoginPage.css"

import { doSignInWithEmailAndPassword ,doSighInWithGoogle } from "@/firebase/authentification"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

interface Props{

}

 const LoginPage = () => {

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [userType, setUserType] = useState<'etudiant' | 'prof'>('prof'); // default


    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [isSigningIn,setIsSigninIn] = useState(false);
    const [errorMessage,setErrormessage] = useState('');

    const onSubmitEmail = async (e: { preventDefault: () => void })=> {
        e.preventDefault();
        if(!isSigningIn){
            setIsSigninIn(true)
            await doSignInWithEmailAndPassword(email,password)
        }
    }

    const onSubmitGoogle = async (e: { preventDefault: () => void }) =>{
        e.preventDefault();
        if(!isSigningIn){
            setIsSigninIn(true)
            doSighInWithGoogle().catch((err) => {
                setIsSigninIn(false)
            })
        }
    }

    useEffect(()=>{
        if(userLoggedIn){
        navigate('/')
        }
    })

    return(
        <div className="login_background">
            <div className="login-page__content">
                 <div className="login-page_top_container">
                <img className="login-page__logo" 
                 src="/images/logo_picto360.png" alt="Logo-picto360" />
                    <h1 className="login-page_seConnecter">Se connecter à un compte</h1>
                    <h2 className="login-page_info">Connectez vous avec vos comptes déjà existants. </h2>
                 </div>

                
                <div className="account-type_container">
                    <h2 className="account-type_title">
                        Type d'utilisateur (trice)
                    </h2>
                    
                    <div className="account-type_options">
                        <div className="account-type_container-inside">
                            <label className="radio-label">
                                <input className="radio-box" 
                                title ="select" 
                                type="radio" 
                                name="checkbox"
                                onChange={() => setUserType('etudiant')}/>
                            </label>
                            {/* <img alt ="checked" className="material-icons-outlined" src="/images/check_circle_100dp_46152F.png"/> */}
                            <h2 className="account-type_etudiant">
                                Etudiant (e)
                            </h2>
                        </div>


                        <div className="account-type_container-inside">
                            <label className="radio-label">
                                <input className="radio-box" 
                                title ="select" 
                                type="radio" 
                                name="checkbox" 
                                defaultChecked={true}
                                onChange={() =>setUserType('prof')} />
                            </label>
                            <h2 className="account-type_prof">
                                Professeur / Tuteur (trice)
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="space-between-options"/>
        
                 <div className="login-page_connection_options">
                    <div className="login-page_connect-baniere" onClick={onSubmitGoogle}>
                        <img src="/images/devicon_google.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">Se connecter avec google</h1>
                        <span className="material-symbols-rounded">
                            chevron_right
                        </span>
                    </div>
                    
                    <div className="space-between-options"/>

                    <div className="login-page_connect-baniere">
                        <img src="/images/logos_facebook.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">Se connecter avec facebook</h1>
                        <span className="material-symbols-rounded">
                            chevron_right
                        </span>
                    </div>

                    <div className="space-between-options"/>

                    <div className="login-page_connect-baniere">
                        <img src="/images/ic_twotone-connected-tv.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">Se connecter avec votre adresse académique</h1>
                        <span className="material-symbols-rounded">
                            chevron_right
                        </span>
                    </div>
                 </div>

                <div className="space-between-sections"/>

                 <button type= "button" className="submit-button">
                        Se connecter
                 </button>
            </div>

            {/* TODO : Create the differents buttons (options)*/}
        </div>
    )
}

export default LoginPage;
