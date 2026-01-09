import { useEffect, useState } from 'react';
import styles from './productDetail.module.css';
import { useCart } from '../cart/CartContext';
import { getCookie } from '../utils/cookies';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils/requests';

const API_URL = `${baseUrl}/products`;

interface Product {
    id: number;
    name: string;
    image_url?: string | null;
    price: number;
    description?: string | null;
    category?: string | null;
}

interface ProductDetailProps {
    productId: number;
    sessionId: string;
}

export default function ProductDetail({ productId, sessionId }: ProductDetailProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [confirmation, setConfirmation] = useState<string | null>(null);
    const { addItem } = useCart();

    useEffect(() => {
        async function loadProduct() {
            try {
                const sid = sessionId || getCookie('session_id') || '';
                if (!sid) {
                    window.location.href = '/';
                    return;
                }
                const res = await fetch(`${API_URL}/${productId}`, {
                    headers: { 'x-api-key': sid },
                });
                if (res.status === 401) {
                    localStorage.removeItem('session_id');
                    window.location.href = '/';
                    return;
                }
                if (!res.ok) throw new Error('Kon productdetails niet ophalen');
                const data: Product = await res.json();
                setProduct(data);
            } catch (err) {
                setError((err as Error).message);
            }
        }
        loadProduct();
    }, [productId, sessionId]);

    if (error) return <p className={styles.error}>{error}</p>;
    if (!product) return <p className={styles.info}>Product wordt geladen…</p>;

    const priceIncl = product.price * 1.21;
    const totalExcl = product.price * quantity;
    const totalIncl = priceIncl * quantity;

// in handleAddToCart:
// const handleAddToCart = () => {
//   addItem(
//     {
//       product_id: product.id,
//       name: product.name,
//       price: product.price,
//       image_url: product.image_url,
//     },
//     quantity
//   );
//   setConfirmation("Product toegevoegd aan winkelmand!");
//   setTimeout(() => setConfirmation(null), 2500);
// };
const handleAddToCart = async () => {
  await addItem(
    {
      product_id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    },
    quantity
  );
  setConfirmation("Product toegevoegd aan winkelmand!");
  setTimeout(() => setConfirmation(null), 2500);
};

    return (
        <main className={styles.page}>
            <header className={styles.headerRow}>
                <button
                    className={styles.backButton}
                    onClick={() => (window.location.href = '/products')}
                >
                    ←
                </button>
                <span className={styles.breadcrumb}>Specifiek product</span>
                <Link to="/cart" className={styles.cartLink}>
                    Winkelmand
                </Link>
            </header>

            <section className={styles.mainGrid}>
                <div className={styles.gallery}>
                    <div className={styles.imageFrame}>
                        <img src={product.image_url ?? '/placeholder.png'} alt={product.name} />
                    </div>
                    <div className={styles.thumbs}>
                        {/* Eventuele thumbnails als je die hebt; anders leeg laten */}
                        <div className={styles.thumbPlaceholder}>•</div>
                        <div className={styles.thumbPlaceholder}>•</div>
                        <div className={styles.thumbPlaceholder}>•</div>
                    </div>
                </div>

                <div className={styles.info}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.description}>
                        {product.description ?? 'Geen beschrijving beschikbaar.'}
                    </p>

                    <div className={styles.priceRow}>
                        <div>
                            <div className={styles.priceEx}>€ {product.price.toFixed(2)}</div>
                            <div className={styles.perUnit}>per stuk</div>
                        </div>
                        <div className={styles.quantityBox}>
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                –
                            </button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                                +
                            </button>
                        </div>
                        <button className={styles.cartButton} onClick={handleAddToCart}>
                            Toevoegen aan winkelwagen
                        </button>
                    </div>
                    {confirmation && <p className={styles.confirmation}>{confirmation}</p>}

                    <table className={styles.specTable}>
                        <thead>
                            <tr>
                                <th>specialities</th>
                                <th>reviews</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Druif</td>
                                <td>100% Albariño</td>
                            </tr>
                            <tr>
                                <td>Regio</td>
                                <td>Rías Baixas, Galicië – Spanje</td>
                            </tr>
                            <tr>
                                <td>Alcoholpercentage</td>
                                <td>12,5%</td>
                            </tr>
                            <tr>
                                <td>Kleur</td>
                                <td>Helder strogeel met groene schakeringen</td>
                            </tr>
                            <tr>
                                <td>Smaak</td>
                                <td>Fris, levendig, fruitig met zachte zuren en ziltige toon</td>
                            </tr>
                            <tr>
                                <td>Serveer-temperatuur</td>
                                <td>8–10 °C</td>
                            </tr>
                            <tr>
                                <td>Bewaarpotentieel</td>
                                <td>2–3 jaar na oogst</td>
                            </tr>
                            <tr>
                                <td>Foodpairing</td>
                                <td>Schaal- en schelpdieren, salades, visgerechten</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.totals}>
                        <div>
                            <span>Totaal excl. btw</span>
                            <strong>€ {totalExcl.toFixed(2)}</strong>
                        </div>
                        <div>
                            <span>Totaal incl. btw</span>
                            <strong>€ {totalIncl.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
