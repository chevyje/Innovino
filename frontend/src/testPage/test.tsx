import Style from "./test.module.css"
import Button from "../components/Button/Button.tsx";

export default function TestPage() {
    return (
        <div className={Style.container}>
            <Button action={() => alert("TEST")}></Button>
            <Button title={"Button"} variant={"secondary"}></Button>
            <Button title={"Button"} variant={"tertiary"}></Button>
        </div>
    );
}
