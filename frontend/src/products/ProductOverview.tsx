import { useMemo, useState } from "react";
import styles from "./productOverview.module.css";
import Page from "../components/Page/Page";
import Card from "../components/Card/Card";
import Banner from "../components/Banner/Banner";

type StorageTemp = "Kamertemperatuur" | "Koeling" | "Vriezer";

interface Product {
    id: number;
    name: string;
    image_url?: string | null;
    price: number;
    description?: string | null;
    category?: string | null;
    amount?: string | null;
    origin_country?: string | null;
    storage_temp?: StorageTemp | null;
}

const priceFormatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
});

const mockProducts: Product[] = [
    {
        id: 1,
        name: "Anijszaad",
        price: 5.52,
        description: "Beschikbaar: 6.000 stuks",
        image_url: "https://placehold.co/400",
        category: "Specerijen",
        amount: "120g",
        origin_country: "Spanje",
        storage_temp: "Kamertemperatuur",
    },
    {
        id: 2,
        name: "AOSA zeewier sojasaus",
        price: 31.0,
        description: "Beschikbaar: 4.000 stuks",
        image_url: "https://placehold.co/400",
        category: "Sauzen",
        amount: "720ML",
        origin_country: "Japan",
        storage_temp: "Koeling",
    },
    {
        id: 3,
        name: "DOMAINE 2019",
        price: 31.23,
        description: "Beschikbaar: 6.000 stuks",
        image_url: "https://placehold.co/400",
        category: "Wijn",
        amount: "750ML",
        origin_country: "Italië",
        storage_temp: "Kamertemperatuur",
    },
    {
        id: 4,
        name: "Whisky, New Path Edition",
        price: 37.92,
        description: "Beschikbaar: 23.000 stuks",
        image_url: "https://placehold.co/400",
        category: "Whisky",
        amount: "700ML",
        origin_country: "Spanje",
        storage_temp: "Kamertemperatuur",
    },
];

const step = 0.01;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function ProductOverview() {
    const [products] = useState<Product[]>(mockProducts);
    const [error] = useState<string | null>(null);

    const minPrice = useMemo(() => Math.min(...products.map((p) => p.price)), [products]);
    const maxPrice = useMemo(() => Math.max(...products.map((p) => p.price)), [products]);

    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

    const typeOptions = useMemo(
        () =>
            Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[])).sort((a, b) =>
                a.localeCompare(b, "nl-NL")
            ),
        [products]
    );

    const originOptions = useMemo(
        () =>
            Array.from(
                new Set(products.map((p) => p.origin_country).filter(Boolean) as string[])
            ).sort((a, b) => a.localeCompare(b, "nl-NL")),
        [products]
    );

    const tempOptions = useMemo(
        () =>
            Array.from(
                new Set(products.map((p) => p.storage_temp).filter(Boolean) as StorageTemp[])
            ).sort((a, b) => a.localeCompare(b, "nl-NL")),
        [products]
    );

    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [selectedOrigins, setSelectedOrigins] = useState<Set<string>>(new Set());
    const [selectedTemps, setSelectedTemps] = useState<Set<string>>(new Set());

    const toggleSetValue = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
        setter((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    const handleMinPriceChange = (value: number) => {
        if (!Number.isFinite(value)) return;
        const v = clamp(value, minPrice, maxPrice);
        const nextMin = Math.min(v, priceRange[1] - step);
        setPriceRange([nextMin, priceRange[1]]);
    };

    const handleMaxPriceChange = (value: number) => {
        if (!Number.isFinite(value)) return;
        const v = clamp(value, minPrice, maxPrice);
        const nextMax = Math.max(v, priceRange[0] + step);
        setPriceRange([priceRange[0], nextMax]);
    };

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

            const typeOk =
                selectedTypes.size === 0 ? true : (p.category ? selectedTypes.has(p.category) : false);

            const originOk =
                selectedOrigins.size === 0
                    ? true
                    : (p.origin_country ? selectedOrigins.has(p.origin_country) : false);

            const tempOk =
                selectedTemps.size === 0
                    ? true
                    : (p.storage_temp ? selectedTemps.has(p.storage_temp) : false);

            return inPrice && typeOk && originOk && tempOk;
        });
    }, [products, priceRange, selectedTypes, selectedOrigins, selectedTemps]);

    const handleCardClick = (id: number) => {
        window.location.href = `/products/${id}`;
    };

    const minPercent =
        maxPrice === minPrice ? 0 : ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent =
        maxPrice === minPrice ? 100 : ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

    return (
        <Page>
            <main className={styles.page}>
                <div className={styles.headerRow}>

                </div>

                {error && (
                    <Banner title="Foutmelding" variant="warning">
                        {error}
                    </Banner>
                )}

                <div className={styles.container}>
                    <section className={styles.filterContainer}>
                        <h2 className={styles.filterTitle}>Filters</h2>
                        <p className={styles.productAmount}>{`${filteredProducts.length} producten`}</p>

                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterSubtitle}>
                                Prijs <span className={styles.muted}>(per stuk)</span>
                            </h3>

                            <div className={styles.priceFilter}>
                                <div className={styles.priceInputs}>
                                    <div className={styles.priceInputBox}>
                                        <span className={styles.currency}>€</span>
                                        <input
                                            id="minPrice"
                                            type="number"
                                            min={minPrice}
                                            max={maxPrice}
                                            step={step}
                                            value={priceRange[0].toFixed(2)}
                                            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                                            className={styles.priceInput}
                                            inputMode="decimal"
                                        />
                                    </div>

                                    <span className={styles.dash}>—</span>

                                    <div className={styles.priceInputBox}>
                                        <span className={styles.currency}>€</span>
                                        <input
                                            id="maxPrice"
                                            type="number"
                                            min={minPrice}
                                            max={maxPrice}
                                            step={step}
                                            value={priceRange[1].toFixed(2)}
                                            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                                            className={styles.priceInput}
                                            inputMode="decimal"
                                        />
                                    </div>
                                </div>

                                <div
                                    className={styles.rangeSliderContainer}
                                    style={
                                        {
                                            ["--min" as any]: `${minPercent}%`,
                                            ["--max" as any]: `${maxPercent}%`,
                                        } as React.CSSProperties
                                    }
                                >
                                    <div className={styles.sliderTrack} />
                                    <div className={styles.sliderRange} />

                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        step={step}
                                        value={priceRange[0]}
                                        onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                                        className={`${styles.rangeSlider} ${styles.rangeSliderMin}`}
                                        aria-label="Minimum prijs"
                                    />

                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        step={step}
                                        value={priceRange[1]}
                                        onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                                        className={`${styles.rangeSlider} ${styles.rangeSliderMax}`}
                                        aria-label="Maximum prijs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterSubtitle}>Type</h3>
                            <div className={styles.checkboxList}>
                                {typeOptions.map((t) => (
                                    <label key={t} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.has(t)}
                                            onChange={() => toggleSetValue(setSelectedTypes, t)}
                                        />
                                        <span className={styles.checkboxText}>{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterSubtitle}>Opslagtemperatuur</h3>
                            <div className={styles.checkboxList}>
                                {tempOptions.map((t) => (
                                    <label key={t} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedTemps.has(t)}
                                            onChange={() => toggleSetValue(setSelectedTemps, t)}
                                        />
                                        <span className={styles.checkboxText}>{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <h3 className={styles.filterSubtitle}>Land van herkomst</h3>
                            <div className={styles.checkboxList}>
                                {originOptions.map((c) => (
                                    <label key={c} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedOrigins.has(c)}
                                            onChange={() => toggleSetValue(setSelectedOrigins, c)}
                                        />
                                        <span className={styles.checkboxText}>{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className={styles.grid}>
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className={styles.card}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleCardClick(product.id)}
                                onKeyDown={(e) => e.key === "Enter" && handleCardClick(product.id)}
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
                </div>
            </main>
        </Page>
    );
}
