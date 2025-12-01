import Style from "./login.module.css"
import type {LoginRequest} from "../models/user_model.ts";
import {authenticate} from "../requests/user_requests.ts"
import Logo from "../assets/Cuimed-logo.jpg"
import CheckBox from "../components/CheckBox/CheckBox"

export default function loginPage() {
    function loginSubmit (formData: any){
        const username: string = formData.get('username')
        const password: string = formData.get('password')
        const data: LoginRequest = {username: username, password: password}
        authenticate(data).then(() => console.log('login tried'))
    }
    return (
        <>
            <div className={Style.background} style={{backgroundImage: "none" }}>
                <div className={Style.wrapper}>
                    <img src={Logo} className={Style.logo} />
                    <div className={Style.loginContainer}>
                        <form action={loginSubmit} className={Style.loginForm}>
                            <p className={Style.tag}>Gebruikersnaam</p>
                            <input type={"text"} name={"username"} className={Style.inputField} />
                            <p className={Style.tag}>Wachtwoord</p>
                            <input type="password" name="password" className={Style.inputField} />
                            <div className={Style.optionsRow}>
                                <CheckBox name="remember" label="Gegevens onthouden" />

                                <p className={Style.forgotPassword}>Wachtwoord vergeten?</p>
                            </div>
                            <button className={Style.button}>Log in</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
