import { useEffect, useState } from 'react';
import styles from './productOverview.module.css';

interface Product {
    id: number;
    name: string;
    image_url?: string | null;
    price: number;
    description?: string | null;
    category?: string | null;
}

const API_URL = 'http://127.0.0.1:8000/api/products';
// Vul hier een geldige session id in zolang er nog geen loginflow is:
const API_KEY = '9c336140-ae11-4a3d-914e-c38f04b0a015'; // bv. '0b8a52...'

const priceFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

export default function ProductOverview() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL, {
                    headers: API_KEY
                        ? { 'x-api-key': API_KEY }
                        : undefined,
                });
                if (!response.ok) {
                    const body = await response.json().catch(() => ({}));
                    throw new Error(body?.message || 'Kon producten niet laden');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Productoverzicht</h1>
            <p className={styles.subtitle}>
                {loading
                    ? 'Producten worden geladen...'
                    : `${products.length} producten`}
            </p>

            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && products.length === 0 && (
                <p className={styles.info}>Geen producten gevonden</p>
            )}

            {!loading && !error && products.length > 0 && (
                <section className={styles.grid}>
                    {products.map((product) => (
                        <article key={product.id} className={styles.card}>
                            {product.image_url && (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    loading="lazy"
                                />
                            )}
                            <div className={styles.cardBody}>
                                <h2>{product.name}</h2>
                                <p className={styles.price}>
                                    {priceFormatter.format(product.price)}
                                </p>
                                {product.description && (
                                    <p className={styles.description}>
                                        {product.description}
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}
