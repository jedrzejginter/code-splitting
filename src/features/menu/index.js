import { memo } from "react";
import { useSelector } from "react-redux";

import { getCategoriesWithProducts } from "./selectors";

export default function Menu({ canAddProduct, onAddProduct, onCustomizeProduct, canCustomizeProduct }) {
  const categories = useSelector(getCategoriesWithProducts);

  return (
    <div>
      {categories.map((c) => (
        <section key={c.id}>
          <h4>{c.name}</h4>
          <ul css={{
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {c.products.map((p) => (
              <li key={p.id} css={{ border: '1px solid #ccc', margin: 10, padding: 10, width: '25%' }}>
                {p.name}<br />
                <button css={{ border: '1px solid black' }} disabled={!canAddProduct} onClick={() => onAddProduct(p)}>Buy me ({p.price} pln)</button>
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
