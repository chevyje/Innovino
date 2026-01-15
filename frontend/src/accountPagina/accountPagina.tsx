import Style from "./accountpagina.module.css"
import Page from "../components/Page/Page.tsx";
import Button from "../components/Button/Button.tsx";
import TextInput from "../components/TextInput/TextInput.tsx";

export default function accountPagina() {
    return (
        <>
            <Page>
                <div className={Style.contentContainer}>
                    <h1 className={Style.accountTitle}>Account</h1>
                    <div className={Style.inputContainer}>
                        <TextInput label="Gebruikersnaam" name="username" disabled={true}/>
                    </div>
                </div>



                <div className={Style.actionRowContainer}>
                    <div className={Style.actionRow}>
                        <Button title={"Uitloggen"} variant={"primary"}/>
                    </div>
                </div>
            </Page>
        </>
    );
}
