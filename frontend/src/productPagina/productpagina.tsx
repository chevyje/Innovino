import style from "./productpagina.module.css";
import Button from "../components/Button/Button";
import Page from "../components/Page/Page";
import Link from "../components/Link/Link";
import testImg from "../assets/testproductimg1.jpg"
import Card from "../components/Card/Card";

export default function ProductPagina () {
    return(
        <>
            <Page>
                <div className={style.page}>
                    {/* KOLOM 1 */}
                    <div className={style.column1}>
                        <div className={style.terugButton}>
                            <Button
                                title="Terug"
                                variant="secondary"
                                onClick={() => window.history.back()}
                            />
                        </div>

                        <img
                            src={testImg}
                            className={style.mainImage}
                            alt="Product afbeelding"
                        />

                        <div className={style.thumbnailRow}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <img
                                    key={i}
                                    src={testImg}
                                    className={`${style.thumbnail} ${
                                        i === 3 ? style.active : ""
                                    }`}
                                    alt="Thumbnail"
                                />
                            ))}
                        </div>

                        <div className={style.priceInfo}>
                            <p className={style.price}>€ 12,40</p>
                            <p className={style.amount}>750 ml</p>
                        </div>
                    </div>

                    {/* KOLOM 2*/}
                    <div className={style.column2}>
                        <h1>Een hele lange titel voor een random product</h1>
                        <p>Dit random product heeft een super lange beschrijving. Dat komt omdat de boer veel werk in zijn product heeft gestopt en veel te vertellen heeft over zijn prachtige product. Wat misschien ook kan, is dat de beschrijving vanuit Cuimed komt. Dat maakt alleen niet zo heel veel uit gelukkig.</p>
                        <div className ={style.inhoud}><h2>Inhoud</h2></div>
                        <h3>Ingrediënten</h3>
                        <p>druiven, conserveermiddel: sulvieten</p>
                        <h3>Allergenen</h3>
                        <p>Dit product bevat geen allergenen</p>
                        <div className ={style.overigeInformatie}><h2>Overige Informatie</h2></div>
                        <p>Hier kan eventueel een klein stukje tekst over het product wat niet bij de beschrijving past.</p>
                        <Link title="PDF technische sheet" path="/products" />
                    </div>

                    {/* KOLOM 3*/}
                    <div className={style.column3}>
                        <Card className={style.purchaseCard}>
                            <div className={style.priceInfo}>
                                <p className={style.price}>€12,40/st</p>
                                <p className={style.vat}>BTW: 9%</p>
                            </div>
                            <div className={style.quantitySelector}>
                                <h2>Aantal:</h2>
                                <div className={style.quantityBox}>
                                <input type="number" id="quantity" name="quantity" defaultValue={1} min={1} />
                                </div>
                            </div>
                            <Button title="Toevoegen aan winkelmand" variant="primary" />
                        </Card>
                    </div>
                </div>
            </Page>
        </>
    )
}