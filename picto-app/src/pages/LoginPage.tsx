import { useAuth } from "@/authContext/authContext";
import "./css/LoginPage.css"

import { doSignInWithEmailAndPassword ,doSighInWithGoogle, doCreateUserWithEmailAndPassword, doSignInWithFacebook } from "@/firebase/authentification"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

interface Props{

}

 const LoginPage = () => {

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [userType, setUserType] = useState<'etudiant' | 'prof'>('prof'); // default


    const [email,setEmail]= useState('');
    const [password,setPassword] = useState<string>('');
    const [isSigningIn,setIsSigninIn] = useState(false);
    const [errorMessage,setErrormessage] = useState('');
    const [loginWithEmailBoxes,setLoginInputBoxes] = useState(false);
    const [isSubscribing,setIsSubscribing] = useState(false);


    const onSubmitGoogle = async (e: { preventDefault: () => void }) =>{
        e.preventDefault();
        if(!isSigningIn){
            setIsSigninIn(true)
            doSighInWithGoogle(userType).catch((err) => {
                setIsSigninIn(false);
            })
        }
    }

    const onSubmitFacebook = async ( e : { preventDefault:() => void } ) => {
        e.preventDefault();
        if(!isSigningIn){
            setIsSigninIn(true)
            doSignInWithFacebook().catch((err) => {
                setIsSigninIn(false);
            })

        }
    }

    useEffect(()=>{
        if(userLoggedIn){
        navigate('/')
        }
    })

    const onAcademicClick = () =>{
        setLoginInputBoxes(!loginWithEmailBoxes);
    }

    const onCancelClick = () => {
        if(!isSigningIn){
            navigate('/');
        }
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubscribeWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email) || email=='') {
            setErrormessage('Adresse email invalide.');
            console.log(errorMessage);
            return;
        }

        // proceed with Firebase login
        if(!isSigningIn){
            setIsSigninIn(true);

            doCreateUserWithEmailAndPassword(email,password).catch((err) => {
                setIsSigninIn(false);
                if(err=="auth/email-already-exists"){
                }
                console.log(err);
            });
        }
    };
    

    const handleSignInWithEmail = async (e: React.FormEvent) =>{
        e.preventDefault();

        if(!isSigningIn){

            setIsSigninIn(true)

            doSignInWithEmailAndPassword(email,password).catch((err) =>{
                if(err == "auth/invalid-credential"){
                    setErrormessage(err);
                    // TODO: Manage errors (already created, wrong credential,etc)
                }
                setIsSigninIn(false);
                console.log(err);
            }
            );
        setErrormessage('');
        navigate('/');
        }


    }

    const onSubscribeClick = () =>{
        setErrormessage('');
        setIsSubscribing(!isSubscribing);
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrormessage('');
        setEmail(e.target.value); // 🔁 Store input value in state
    };

    const handleChangePassword = (pass: React.ChangeEvent<HTMLInputElement>) => {
        setErrormessage('');
        // console.log("Password typed:", pass.target.value);
        setPassword(pass.target.value);
    };

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
                            <label className="account-type_container-inside">
                                <input className="radio-box" 
                                title ="select" 
                                type="radio" 
                                name="checkbox"
                                onChange={() => setUserType('etudiant')}/>
                            <h2 className="account-type_text">
                                Etudiant (e)
                            </h2>
                            </label>
                            {/* <img alt ="checked" className="material-icons-outlined" src="/images/check_circle_100dp_46152F.png"/> */}

                            <label className="account-type_container-inside">
                                <input className="radio-box" 
                                title ="select" 
                                type="radio" 
                                name="checkbox" 
                                defaultChecked={true}
                                onChange={() =>setUserType('prof')} />
                            <h2 className="account-type_text">
                                Professeur / Tuteur (trice)
                            </h2>
                            </label>

                    </div>
                </div>

                <div className="space-between-options"/>
        
                 <div className="login-page_connection_options">
                    <div className="login-page_connect-baniere" onClick={onSubmitGoogle}>
                        <img src="/images/devicon_google.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">
                            {isSubscribing ? "S'inscrire" : "Se connecter" }  avec google
                        </h1>
                        <span className="material-icons">
                            chevron_right
                        </span>
                    </div>
                    
                    <div className="space-between-options"/>

                    <div className="login-page_connect-baniere" onClick={onSubmitFacebook}>
                        <img src="/images/logos_facebook.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">
                            {isSubscribing ? "S'inscrire" : "Se connecter" }  avec facebook
                        </h1>
                        <span className="material-icons">
                            chevron_right
                        </span>
                    </div>

                    <div className="space-between-options"/>

                    <div>
                        <div className="login-page_connect-baniere" onClick={onAcademicClick}>
                            <img src="/images/ic_twotone-connected-tv.png" alt="google" className="login-page_option-icon"/>
                            <h1 className="login-page_option-text">
                                {isSubscribing ? "S'inscrire" : "Se connecter" } avec votre adresse académique
                            </h1>
                            {
                                loginWithEmailBoxes ?
                                <span className="material-icons">
                                keyboard_arrow_down
                                </span>
                                :
                                <span className="material-icons">
                                    chevron_right
                                </span>
                            }

                        </div>
                        {
                            loginWithEmailBoxes &&
                            <div className="login_with_email_hidden">
                                {errorMessage != '' &&
                                    <div className="login_error_message">
                                        <p> {errorMessage} </p>
                                    </div>                                
                                }


                                <div className="loginWithEmailBoxes">
                                    <div className="login_with_email_dialog">
                                        <h2 className="login_with_email_text">Email</h2>
                                        <input type="email" 
                                            title="email" 
                                            className="login_dialog_box" 
                                            placeholder="you@example.com"
                                            onChange={handleChangeEmail}/>
                                    </div>


                                    <div className="login_with_email_dialog">
                                        <h2 className="login_with_email_text">Mot de passe</h2>
                                        <input type="password" 
                                            title="password" 
                                            className="login_dialog_box"
                                            value={password}
                                            onChange={handleChangePassword}
                                            placeholder="Entrez votre password"
                                        />
                                    </div>
                                    
                                </div>
                                {isSubscribing &&
                                    <div className="login_with_email_dialog">
                                        <h2 className="login_with_email_text">Nom d'utilisateur</h2>
                                        <input type="form" 
                                            title="user_name" 
                                            className="login_dialog_box" 
                                            placeholder="Entrez votre nom"
                                            />
                                    </div>                                  
                                }

                                {
                                    isSubscribing ?
                                      
                                    <div className="login_with_email_choice">
                                        <p> Vouz avez déjà un compte ?</p>
                                        <p className="login_with_email_subscribe" onClick={onSubscribeClick}> Se connecter </p>
                                    </div> 

                                    :
                                    <div className="login_with_email_choice">
                                        <p>C'est votre première fois ?</p>
                                        <p className="login_with_email_subscribe" onClick={onSubscribeClick}> S'inscrire </p>
                                    </div> 

                                }                          
                            </div>                        

                        }
                        <div className="space-between-options"/>
                        
                        <div className="bottom-buttons">
                            <button type="button" className="cancel-button" onClick={onCancelClick}>
                                Annuler
                            </button>
                            { 
                                isSubscribing ?
                                loginWithEmailBoxes &&
                                <button type= "button" className="submit-button" onClick={handleSubscribeWithEmail}>
                                        Inscription
                                </button> 
                                :
                                loginWithEmailBoxes &&
                                <button type= "button" className="submit-button" onClick={handleSignInWithEmail}>
                                        Connexion
                                </button> 
                            }
                        </div>


                    </div>

                 </div>

            </div>

            {/* TODO : Create the differents buttons (options)*/}
        </div>
    )
}

export default LoginPage;
