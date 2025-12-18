import { Link as RouterLink } from "react-router-dom";
import { useCart } from "./CartContext";
import Page from "../components/Page/Page";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import styles from "./cartPage.module.css";
import fallbackImg from "../assets/testproductimg1.jpg";

const formatCurrency = (value: number) => `€ ${value.toFixed(2).replace(".", ",")}`;
const VAT_RATE = 0.21;
const SHIPPING_EXCL = 9.09;

export default function CartPage() {
  const { items, updateQuantity } = useCart();

  const subtotalExcl = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalIncl = subtotalExcl * (1 + VAT_RATE);
  const shippingExcl = items.length ? SHIPPING_EXCL : 0;
  const shippingIncl = shippingExcl * (1 + VAT_RATE);
  const grandTotal = subtotalIncl + shippingIncl;

  if (!items.length) {
    return (
      <Page>
        <main className={styles.page}>
          <Card>
            <p style={{ margin: 0, color: "black" }}>Je mand is leeg.</p>
          </Card>
        </main>
      </Page>
    );
  }

  return (
    <Page>
      <main className={styles.page}>
        <div className={styles.grid}>
          <div className={styles.cardWrap}>
            <Card>
              <div className={styles.panel}>
                <h2 className={styles.title}>Winkelwagen</h2>
                <div className={styles.items}>
                  {items.map((item) => {
                    const imgSrc = item.image_url || fallbackImg;
                    return (
                      <div key={item.product_id} className={styles.itemRow}>
                        <div className={styles.thumb}>
                          <img src={imgSrc} alt={item.name} />
                        </div>
                        <div className={styles.info}>
                          <p className={styles.itemName}>{item.name}</p>
                          <p className={styles.itemPrice}>{formatCurrency(item.price)}</p>
                          <span className={styles.stockOk}>Op voorraad</span>
                        </div>
                        <div className={styles.qtyBlock}>
                          <span className={styles.qtyLabel}>Aantal:</span>
                          <input
                            className={styles.qtyInput}
                            type="number"
                            min={0}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product_id, Number(e.target.value))}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.backLink}>
                  <p style={{ margin: "0.25rem 0" }}>Toch meer producten bestellen?</p>
                  <RouterLink to="/products">Terug naar Producten</RouterLink>
                </div>
              </div>
            </Card>
          </div>

          <div className={styles.cardWrap}>
            <Card>
              <div className={styles.panel}>
                <h2 className={styles.summaryTitle}>Overzicht</h2>
                <div className={styles.summaryRows}>
                  <div className={styles.row}>
                    <span>Subtotaal excl. BTW</span>
                    <span>{formatCurrency(subtotalExcl)}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Subtotaal incl. BTW</span>
                    <span>{formatCurrency(subtotalIncl)}</span>
                  </div>
                  <div className={styles.row}>
                    <span>Verzendkosten excl. BTW</span>
                    <span>{formatCurrency(shippingExcl)}</span>
                  </div>
                  <hr className={styles.divider} />
                  <div className={`${styles.row} ${styles.totalRow}`}>
                    <span>Totaal incl. BTW:</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className={styles.discount}>Korting toevoegen</div>

                <div className={styles.cta}>
                  <Button title="Doorgaan naar betalen" variant="primary" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </Page>
  );
}
