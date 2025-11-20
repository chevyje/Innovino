import Style from "./card.module.css"

export default function Card({ children } : any) {
    return (
        <div className={Style.cardContainer}>
            {children}
        </div>
    );
}
