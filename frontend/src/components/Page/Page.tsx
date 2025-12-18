import Style from "./page.module.css"
import Logo from "../../assets/Cuimed-logo.jpg"
import {ShoppingBasket} from "lucide-react";
import {Link} from "react-router-dom";


export default function Page({ children } : any) {
    return (
        <div className={Style.pageContainer}>
            <div className={Style.navbar}>
                <img alt={"Cuimed"} src={Logo} className={Style.logo}></img>
                <Link to="/cart" className={Style.basketLink}>
                    <ShoppingBasket className={Style.basketIcon} />
                </Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
