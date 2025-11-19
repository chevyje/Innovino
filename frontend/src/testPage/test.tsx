import Style from "./test.module.css"
import Button from "../components/Button/Button.tsx";
import Link from "../components/Link/Link.tsx";

export default function TestPage() {
    return (
        <>
            <div className={Style.container}>
                <p className={Style.header}>Header</p>
                <p className={Style.subtitle}>Subtitle</p>
                <p className={Style.body}>Body</p>
            </div>
            <div className={Style.container}>
                <Link title={"Dit is een link"} path={"/test"}/>
            </div>
            <div className={Style.container}>
                <Button action={() => alert("TEST")}></Button>
                <Button title={"Button"} variant={"secondary"}></Button>
                <Button title={"Button"} variant={"tertiary"}></Button>
            </div>

        </>

    );
}
