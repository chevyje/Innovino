import { useState, type FormEvent } from "react";
import Style from "./login.module.css";
import type { LoginRequest } from "../models/user_model.ts";
import { authenticate } from "../requests/user_requests.ts";
import Logo from "../assets/Cuimed-logo.jpg";

import TextInput from "../components/TextInput/TextInput";
import CheckBox from "../components/CheckBox/CheckBox";
import Button from "../components/Button/Button";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import Link from "../components/Link/Link";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = String(formData.get("username") ?? "");
        const password = String(formData.get("password") ?? "");

        const data: LoginRequest = { username, password };

        setError(null);

        try {
            await authenticate(data);
        } catch {
            setError("Controleer je gebruikersnaam en wachtwoord.");
        }
    }

    return (
        <div className={Style.container}>
            <img src={Logo} className={Style.logo} alt="Cuimed logo" />
            <div className={Style.loginContainer}>


                {error && (
                    <div className={Style.errorContainer}>
                        <Banner title="Inloggen mislukt" variant="warning">
                            {error}
                        </Banner>
                    </div>
                )}


                <Card>
                    <form onSubmit={handleSubmit} className={Style.loginForm}>
                        <TextInput label="Gebruikersnaam" name="username" />
                        <TextInput label="Wachtwoord" name="password" type="password" />

                        <div className={Style.optionsRow}>
                            <CheckBox name="remember" label="Gegevens onthouden" />
                            <Link title="Wachtwoord vergeten?" path="/wachtwoord-vergeten" />
                        </div>
                        <div className={Style.btnContainer}>
                            <Button title="Log in" />
                        </div>
                    </form>
                </Card>

            </div>
        </div>
    );
}
