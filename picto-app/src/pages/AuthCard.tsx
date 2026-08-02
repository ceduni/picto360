import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext/authContext";
import {
    doSighInWithGoogle,
    doSignInWithEmailAndPassword,
    doCreateUserWithEmailAndPassword,
} from "@/firebase/authentification";
import ErrorBanner from "@/components/FeedbackBanner";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import "./css/AuthCard.css";

type Tab = "login" | "register";

// Reusable auth form card — used standalone in embedded in EditorPage.
const AuthCard = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const { setBannerMessage, bannerRef } = useFeedbackBanner();

    const [tab, setTab] = useState<Tab>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userLoggedIn) navigate("/dashboard", { replace: true });
    }, [userLoggedIn]);

    const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const handleGoogle = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        try {
            await doSighInWithGoogle();
        } catch (err: any) {
            if (err.code !== "auth/popup-closed-by-user") {
                setBannerMessage({ message: err.message, type: "warning" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setBannerMessage({ message: "Format d'email invalide", type: "warning" });
            return;
        }
        if (!password) {
            setBannerMessage({ message: "Veuillez entrer un mot de passe", type: "warning" });
            return;
        }
        if (tab === "register" && password !== confirmPassword) {
            setBannerMessage({ message: "Les mots de passe ne correspondent pas", type: "warning" });
            return;
        }
        if (isLoading) return;
        setIsLoading(true);
        try {
            if (tab === "login") {
                await doSignInWithEmailAndPassword(email, password);
            } else {
                await doCreateUserWithEmailAndPassword(email, password);
            }
        } catch (err: any) {
            setBannerMessage({ message: err.message, type: "failure" });
            setIsLoading(false);
        }
    };

    const switchTab = (next: Tab) => {
        setTab(next);
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="auth-card">
            <ErrorBanner ref={bannerRef} />

            {/* Tabs */}
            <div className="auth-tabs">
                <button
                    className={`auth-tab${tab === "login" ? " auth-tab--active" : ""}`}
                    onClick={() => switchTab("login")}
                >
                    Se connecter
                </button>
                <button
                    className={`auth-tab${tab === "register" ? " auth-tab--active" : ""}`}
                    onClick={() => switchTab("register")}
                >
                    S'inscrire
                </button>
            </div>

            {/* Heading */}
            <div className="auth-heading">
                <h1 className="auth-heading__title">
                    {tab === "login" ? "Bon retour !" : "Créer un compte"}
                </h1>
                <p className="auth-heading__sub">
                    {tab === "login"
                        ? "Connectez-vous à votre espace Picto360."
                        : "Commencez à créer vos activités 360°."}
                </p>
            </div>

            {/* Google */}
            <button className="auth-google-btn" onClick={handleGoogle} disabled={isLoading}>
                <img src="/images/devicon_google.png" alt="Google" width={18} height={18} />
                {tab === "login" ? "Se connecter" : "S'inscrire"} avec Google
            </button>

            {/* Divider */}
            <div className="auth-divider">
                <span />
                <p>Ou continuer avec email</p>
                <span />
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="auth-field">
                    <label className="auth-field__label">Email</label>
                    <input
                        type="email"
                        className="auth-field__input"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="auth-field">
                    <label className="auth-field__label">Mot de passe</label>
                    <input
                        type="password"
                        className="auth-field__input"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={tab === "login" ? "current-password" : "new-password"}
                    />
                </div>

                {tab === "register" && (
                    <div className="auth-field">
                        <label className="auth-field__label">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            className="auth-field__input"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                )}

                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                    {isLoading
                        ? "Chargement…"
                        : tab === "login"
                        ? "Se connecter"
                        : "Créer un compte"}
                </button>
            </form>

            {/* Footer */}
            <p className="auth-footer">
                En {tab === "login" ? "vous connectant" : "créant un compte"}, vous acceptez
                nos{" "}
                <a href="#" className="auth-footer__link">Conditions d'utilisation</a>
                {" "}et{" "}
                <a href="#" className="auth-footer__link">Politique de confidentialité</a>.
            </p>
        </div>
    );
};

export default AuthCard;
