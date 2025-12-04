import { useState, type ReactNode } from "react";
import { Info, X } from "lucide-react";
import Style from "./banner.module.css";

type Variant = "info" | "warning" | "note";

interface Props {
    title?: string;
    children?: ReactNode;
    variant?: Variant;
}

export default function Banner({ title, children, variant = "info" }: Props) {
    const [visible, setVisible] = useState(true);

    if (!visible) {return null;}

    const containerClasses = [
        Style.bannerContainer,
        variant ? Style[variant] : ""
    ].filter(Boolean).join(" ");

    const contentClass = variant === "note" ? Style.noteContent : Style.content;

    const headerClasses = [
        Style.header,
        variant === "note" ? Style.noteHeader : ""
    ].filter(Boolean).join(" ");

    return (
        <div className={containerClasses}>
            <div className={headerClasses}>
                <div className={Style.headerLeft}>
                    <Info className={Style.icon} />
                    {title && <div className={Style.title}>{title}</div>}
                </div>

                <button type="button"
                    className={Style.closeButton}
                    onClick={() => setVisible(false)}>
                    <X className={Style.closeIcon} />
                </button>
            </div>

            <div className={contentClass}>
                {children}
            </div>
        </div>
    );
}
