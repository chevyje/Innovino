import Style from "./button.module.css";

interface Props {
    title?: string;
    variant?: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export default function Button({title = "Button", variant = "primary", type = "button", onClick, disabled,}: Props) {
    const classes = `${Style.button} ${Style[variant] ?? ""}`;

    return (
        <button
            className={classes}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
}
