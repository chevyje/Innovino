import { useState } from 'react';
import styles from './productOverview.module.css';
import Page from '../components/Page/Page';
import Card from '../components/Card/Card';
import Banner from '../components/Banner/Banner';

interface Product {
    id: number;
    name: string;
    image_url?: string | null;
    price: number;
    description?: string | null;
    category?: string | null;
    amount?: string | null;
}

const priceFormatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
});

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Anijszaad',
        price: 5.52,
        description: 'Beschikbaar: 6.000 stuks',
        image_url: 'https://placehold.co/400',
        category: 'Specerijen',
        amount: "120g"
    },
    {
        id: 2,
        name: 'AOSA zeewier sojasaus',
        price: 31.0,
        description: 'Beschikbaar: 4.000 stuks',
        image_url: 'https://placehold.co/400',
        category: 'Sauzen',
        amount: "720ML"
    },
    {
        id: 3,
        name: 'DOMAINE 2019',
        price: 31.23,
        description: 'Beschikbaar: 6.000 stuks',
        image_url: 'https://placehold.co/400',
        category: 'Wijn',
        amount: "750ML"
    },
    {
        id: 4,
        name: 'Whisky, New Path Edition',
        price: 37.92,
        description: 'Beschikbaar: 23.000 stuks',
        image_url: 'https://placehold.co/400',
        category: 'Whisky',
        amount: "700ML"
    },
];

export default function ProductOverview() {
    const [products] = useState<Product[]>(mockProducts);
    const [error] = useState<string | null>(null);

    const handleCardClick = (id: number) => {
        window.location.href = `/products/${id}`;
    };

    return (
        <Page>
            <main className={styles.page}>
                <div className={styles.headerRow}>
                    <div>
                        <p className={styles.subtitle}>
                            {`${products.length} producten`}
                        </p>
                    </div>
                </div>

                {error && (
                    <Banner title="Foutmelding" variant="warning">
                        {error}
                    </Banner>
                )}

                <section className={styles.grid}>
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className={styles.card}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleCardClick(product.id)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(product.id)}
                        >
                            {product.image_url && (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className={styles.cardImage}
                                    loading="lazy"
                                />
                            )}
                            <div className={styles.cardBody}>
                                <h2 className={styles.cardTitle}>{product.name}</h2>

                                <div className={styles.metaRow}>
                                    <p className={styles.price}>{priceFormatter.format(product.price)}</p>
                                    {product.amount && <p className={styles.amount}>{product.amount}</p>}
                                </div>
                            </div>
                        </Card>
                    ))}
                </section>
            </main>
        </Page>
    );
}
