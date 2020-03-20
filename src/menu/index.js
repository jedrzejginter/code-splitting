import { useSelector } from "react-redux";
import { getCategoriesWithProducts } from "./selectors";
import { memo } from "react";

export default function Menu({ canAddProduct, onAddProduct, onCustomizeProduct, canCustomizeProduct }) {
  const categories = useSelector(getCategoriesWithProducts);

  return (
    <div>
      {categories.map((c) => (
        <section key={c.id}>
          <h4>{c.name}</h4>
          <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
            {c.products.map((p) => (
              <li key={p.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10, width: '25%' }}>
                {p.name}<br />
                <button disabled={!canAddProduct} onClick={() => onAddProduct(p)}>Buy me ({p.price} pln)</button>
                {p._isConfigurable && canCustomizeProduct && (
                  <button onClick={() => onCustomizeProduct(p)}>customize</button>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
