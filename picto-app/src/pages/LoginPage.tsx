import { useAuth } from "@/authContext/authContext";
import "./css/LoginPage.css"

import { doSignInWithEmailAndPassword ,doSighInWithGoogle, doCreateUserWithEmailAndPassword, doSignInWithFacebook } from "@/firebase/authentification"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import ErrorBanner from "../components/FeedbackBanner";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

 const LoginPage = () => {

    const { currentUser,userLoggedIn } = useAuth();
    const { setBannerMessage,bannerRef } = useFeedbackBanner();
    const navigate = useNavigate();

    const [email,setEmail]= useState('');
    const [password,setPassword] = useState<string>('');
    const [isSigningIn,setIsSigninIn] = useState(false);
    const [loginWithEmailBoxes,setLoginInputBoxes] = useState(false);
    const [isSubscribing,setIsSubscribing] = useState(false);


    const onSubmitGoogle = async (e: { preventDefault: () => void }) =>{
        e.preventDefault();
        if(!isSigningIn){
            setIsSigninIn(true)
            try{
                await doSighInWithGoogle();
            }catch (err: any) {

                if (err.code !== 'auth/popup-closed-by-user') {
                     setBannerMessage({message:'Google Sign-In Error:'+ err.message,type:"warning"});
                }
            }finally{
                setIsSigninIn(false);
            }
        }
    }

    const onSubmitFacebook = async ( e : { preventDefault:() => void } ) => {
        e.preventDefault();
        if(!isSigningIn){
            setIsSigninIn(true)
            try{
                await doSignInWithFacebook();
            }catch (err: any) {
                if (err.code != 'auth/popup-closed-by-user') {
                     setBannerMessage({message:'Facebook Sign-In Error:'+ err.message,type:"warning"});
                }
            }finally{
                setIsSigninIn(false);
            }
        }
    }

    useEffect(()=>{
        if(userLoggedIn){
            navigate('/',{replace:true})
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
             setBannerMessage({ message:"Format de l'adresse email invalide",type:"warning"});
            return;
        }
        if(password===""){
             setBannerMessage({ message:"Veuillez entrer un mot de passe",type:"warning"});
            // bannerRef.current?.trigger(errorMessage,"warning");
            return;            
        }        

        // proceed with Firebase login
        if(!isSigningIn){
            setIsSigninIn(true);

            doCreateUserWithEmailAndPassword(email,password).catch((err) => {
                setIsSigninIn(false);
                 setBannerMessage({ message:err,type:"failure"});
                // bannerRef.current?.trigger(errorMessage,"failure");
            });
        }
    };
    

    const handleSignInWithEmail = async (e: React.FormEvent) =>{
        e.preventDefault();

        if (!isValidEmail(email) || email=='') {
             setBannerMessage({ message:"Format de l'adresse email invalide.",type:"warning"});
            // console.log(errorMessage);
            // bannerRef.current?.trigger(errorMessage,"warning");
            return;
        }
        if(password===""){
             setBannerMessage({ message:"Veuillez entrer un mot de passe",type:"warning"});
            // console.log(errorMessage);
            // bannerRef.current?.trigger(errorMessage,"warning");
            return;            
        }
        
        if(!isSigningIn){

            setIsSigninIn(true)
            try{
                doSignInWithEmailAndPassword(email,password);
            }catch(err:any){
                setIsSigninIn(false);
                setBannerMessage({ message:err.message,type:"failure"});
                // bannerRef.current?.trigger(errorMessage?.message,"failure");
                setIsSigninIn(false);
            };
        }


    }

    const onSubscribeClick = () =>{
        setIsSubscribing(!isSubscribing);
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value); // 🔁 Store input value in state
         setBannerMessage({ message:'Email changed succesfuly',type:"success"});
    };

    const handleChangePassword = (pass: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("Password typed:", pass.target.value);
        setPassword(pass.target.value);
         setBannerMessage({ message:'password changed succesfuly',type:"success"});
    };

    return(
        <div className="login_background">
            

            <div className="login-page__content">

                 <div className="login-page_top_container">
                    <ErrorBanner ref={bannerRef}/>

                    <img className="login-page__logo" 
                    src="/images/logo_picto360.png" alt="Logo-picto360" />

                    <h1 className="login-page_seConnecter">
                        Se connecter à un compte
                    </h1>
                    
                    <h2 className="login-page_info">
                        Connectez vous avec vos comptes déjà existants. 
                    </h2>
                 </div>

                
                {/* <div className="account-type_container">
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
                </div> */}

        
                <div className= {loginWithEmailBoxes ? "login-page_connection_options-open" : "login-page_connection_options"}>

                    <div className="login-page_connect-baniere" onClick={onSubmitGoogle} >
                        <img src="/images/devicon_google.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">
                            {isSubscribing ? "S'inscrire" : "Se connecter" }  avec google
                        </h1>
                        <LuChevronRight size={24} strokeWidth={2.5}/>
                    </div>
                    

                    <div className="login-page_connect-baniere" onClick={onSubmitFacebook}>
                        <img src="/images/logos_facebook.png" alt="google" className="login-page_option-icon"/>
                        <h1 className="login-page_option-text">
                            {isSubscribing ? "S'inscrire" : "Se connecter" }  avec facebook
                        </h1>
                        <LuChevronRight size={24} strokeWidth={2.5}/>
                    </div>


                    <div>
                        <div className="login-page_connect-baniere" onClick={onAcademicClick}>
                            <img src="/images/ic_twotone-connected-tv.png" alt="google" className="login-page_option-icon"/>
                            <h1 className="login-page_option-text">
                                {isSubscribing ? "S'inscrire" : "Se connecter" } avec votre adresse académique
                            </h1>
                            {
                                loginWithEmailBoxes ?
                                <LuChevronDown size={24} strokeWidth={2.5}/>
                                :
                                <LuChevronRight size={24} strokeWidth={2.5}/>
                            }

                        </div>
                        {
                            loginWithEmailBoxes &&
                            <div className="login_with_email_hidden">


                                <div className="loginWithEmailBoxes">
                                    <div className="login_with_email_dialog">
                                        <h2 className="login_with_email_text">Email</h2>
                                        <input type="email" 
                                            title="email" 
                                            value={email}
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
                                {/* {
                                isSubscribing &&
                                    <div className="login_with_email_dialog">
                                        <h2 className="login_with_email_text">Nom d'utilisateur</h2>
                                        <input type="form" 
                                            title="user_name" 
                                            className="login_dialog_box" 
                                            placeholder="Entrez votre nom"
                                            />
                                    </div>                                  
                                } */}

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

                    </div>                   

                 </div>

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

            {/* TODO : Create the differents buttons (options)*/}
        </div>
    )
}

export default LoginPage;
