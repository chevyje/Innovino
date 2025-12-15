import { useEffect, useState } from 'react';
import styles from './productOverview.module.css';
import { getCookie } from '../utils/cookies';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils/requests';

interface Product {
    id: number;
    name: string;
    image_url?: string | null;
    price: number;
    description?: string | null;
    category?: string | null;
}

const API_URL = `${baseUrl}/products`;

const priceFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

interface ProductOverviewProps {
    sessionId: string;
}

export default function ProductOverview({ sessionId }: ProductOverviewProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const sid = sessionId || getCookie('session_id') || '';
                const response = await fetch(API_URL, {
                    headers: sid ? { 'x-api-key': sid } : {},
                });

                if (response.status === 401) {
                    localStorage.removeItem('session_id');
                    window.location.href = '/';
                    return;
                }

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
    }, [sessionId]);

    const handleCardClick = (id: number) => {
        window.location.href = `/products/${id}`;
    };

    return (
        <main className={styles.page}>
            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>Productoverzicht</h1>
                    <p className={styles.subtitle}>
                        {loading ? 'Producten worden geladen...' : `${products.length} producten`}
                    </p>
                </div>
                <Link to="/cart" className={styles.cartLink}>
                    Winkelmand
                </Link>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && products.length === 0 && (
                <p className={styles.info}>Geen producten gevonden</p>
            )}

            {!loading && !error && products.length > 0 && (
                <section className={styles.grid}>
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className={styles.card}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleCardClick(product.id)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(product.id)}
                        >
                            {product.image_url && (
                                <img src={product.image_url} alt={product.name} loading="lazy" />
                            )}
                            <div className={styles.cardBody}>
                                <h2>{product.name}</h2>
                                <p className={styles.price}>{priceFormatter.format(product.price)}</p>
                                {product.description && (
                                    <p className={styles.description}>{product.description}</p>
                                )}
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}
