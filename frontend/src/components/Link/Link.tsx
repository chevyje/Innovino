import Style from "./link.module.css"

interface Props {
    title?: string,
    path?: string;
}

export default function Link({ title, path }: Props) {
    const btnTitle : string = title ?? "Link"
    const classes = `${Style.link}`;
    return (
        <div className={Style.buttonContainer}>
            <a className={`${classes}`} href={`${path}`}>{btnTitle}</a>
        </div>
    );
}
