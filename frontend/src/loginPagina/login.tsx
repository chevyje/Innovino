import Style from "./login.module.css"
import bg from "../assets/inlog-background.jpg"

export default function loginPage() {
    function loginSubmit (formData: any){
        const username: string = formData.get('username')
        const password: string = formData.get('password')
        auth({ username: username, password: password }).then(() => console.log('login tried'))
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
interface User {
    username: string
    password: string
}
function auth (user: User) {
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Accept", "application/json")

    const request: RequestInfo = new Request('http://127.0.0.1:8000/api/users/auth', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    })

    return fetch(request).then(res => res.json()).then((data) => alert(JSON.stringify(data)))
}
