import Style from "./page.module.css"
import Logo from "../../assets/Cuimed-logo.jpg"


export default function Page({ children } : any) {
    return (
        <div className={Style.pageContainer}>
            <div className={Style.navbar}>
                <img alt={"Cuimed"} src={Logo} className={Style.logo}></img>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
