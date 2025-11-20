import Style from "./login.module.css"
import bg from "../assets/inlog-background.jpg"
import type {LoginRequest} from "../models/user_model.ts";
import {authenticate} from "../requests/user_requests.ts"

export default function loginPage() {
    function loginSubmit (formData: any){
        const username: string = formData.get('username')
        const password: string = formData.get('password')
        const data: LoginRequest = {username: username, password: password}
        authenticate(data).then(() => console.log('login tried'))
    }
    return (
        <>
            <div className={Style.background} style={{backgroundImage: `url(${bg})` }}>
                <div className={Style.wrapper}>
                    <h1 className={Style.title}>Inloggen</h1>
                    <div className={Style.loginContainer}>
                        <form action={loginSubmit} className={Style.loginForm}>
                            <p className={Style.tag}>Gebruikersnaam</p>
                            <input type={"text"} name={"username"} className={Style.inputField} />
                            <p className={Style.tag}>Wachtwoord</p>
                            <input type={"password"} name={"password"} className={Style.inputField}/>
                            <button className={Style.button}>Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
