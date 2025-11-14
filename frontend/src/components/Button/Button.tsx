import Style from "./button.module.css"

interface Props {
    title?: string,
    variant?: string,
    action?: any,
}

export default function Button({ title, variant, action }: Props) {
    const btnVariant : string = variant ?? "primary";
    const btnTitle : string = title ?? "Button"
    const classes = `${Style.button} ${Style[btnVariant]}`;
    return (
        <div className={Style.buttonContainer}>
            <button className={`${classes}`} onClick={action}>{btnTitle}</button>
        </div>
    );
}
