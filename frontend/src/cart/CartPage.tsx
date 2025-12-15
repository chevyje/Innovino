import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clear } = useCart();

  return (
    <main style={{ padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0 }}>Winkelmand</h1>
          <p style={{ margin: 0, color: "#555" }}>{items.length} items</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/products" style={{ textDecoration: "none", padding: "0.5rem 0.75rem", border: "1px solid #ccc", borderRadius: "6px" }}>
            ← Verder winkelen
          </Link>
          {items.length > 0 && (
            <button onClick={clear} style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: "1px solid #d00", background: "#fff0f0", color: "#d00" }}>
              Mand leegmaken
            </button>
          )}
        </div>
      </header>

      {items.length === 0 ? (
        <p>Je mand is leeg.</p>
      ) : (
        <section style={{ display: "grid", gap: "1rem" }}>
          {items.map((item) => (
            <article key={item.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "1rem", alignItems: "center", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "10px", background: "#fff" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", background: "#f1f5f9" }}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>Geen foto</div>
                )}
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: "0.25rem 0", color: "#475569" }}>€ {item.price.toFixed(2)} per stuk</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: "0.35rem 0.6rem", border: "1px solid #ccc", borderRadius: "6px", background: "#f8fafc" }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: "0.35rem 0.6rem", border: "1px solid #ccc", borderRadius: "6px", background: "#f8fafc" }}>+</button>
                  <button onClick={() => removeItem(item.id)} style={{ marginLeft: "1rem", padding: "0.35rem 0.75rem", borderRadius: "6px", border: "1px solid #d00", background: "#fff0f0", color: "#d00" }}>
                    Verwijder
                  </button>
                </div>
              </div>
              <div style={{ justifySelf: "end", textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: 700 }}>€ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </article>
          ))}

          <div style={{ textAlign: "right", fontSize: "1.1rem", fontWeight: 700 }}>
            Totaal: € {total.toFixed(2)}
          </div>
        </section>
      )}
    </main>
  );
}
