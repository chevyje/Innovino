import Style from "./test.module.css"
import Button from "../components/Button/Button.tsx";
import Link from "../components/Link/Link.tsx";
import Card from "../components/Card/Card.tsx";
import Banner from "../components/Banner/Banner.tsx";
import Page from "../components/Page/Page.tsx";
import ProductImages from "../components/ProductImages/ProductImages"
import testimg1 from "../assets/inlog-background.jpg";
import testproductimg1 from "../assets/testproductimg1.jpg"

export default function TestPage() {
    return (
        <>
            <Page>
                <Banner title="Informatie" variant="info">
                    Informatie
                </Banner>

                <Banner title="Waarschuwing" variant="warning">
                    Waarschuwing
                </Banner>

                <Banner title="Andere informatie" variant="note">
                    Banner
                </Banner>

                <Card>
                    <p className={Style.header}>Header</p>
                    <p className={Style.subtitle}>Subtitle</p>
                    <p className={Style.body}>Body</p>
                </Card>
                <div className={Style.container}>
                    <Link title={"Dit is een link"} path={"/test"}/>
                </div>
                <div className={Style.container}>
                    <Button action={() => alert("TEST")}></Button>
                    <Button title={"Button"} variant={"secondary"}></Button>
                    <Button title={"Button"} variant={"tertiary"}></Button>
                </div>
                <div style={{ padding: "40px", maxWidth: "800px" }}>
                    <ProductImages
                        images={[testimg1, testproductimg1]}
                        alt="Test product"
                   />
                 </div>
            </Page>
        </>
    );
}
