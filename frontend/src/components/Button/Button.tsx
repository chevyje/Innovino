import Style from "./button.module.css"

interface Props {
    title?: string,
    variant?: string,
}

export default function Button({ title, variant }: Props) {
    const btnVariant : string = variant ?? "primary";
    const btnTitle : string = title ?? "Button"
    const classes = `${Style.button} ${Style[btnVariant]}`;
    return (
        <div className={Style.buttonContainer}>
            <button className={`${classes}`}>{btnTitle}</button>
        </div>
    );
}
