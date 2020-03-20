import { useState, useCallback } from "react";
import { singleStringSearch } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStringTopResults } from "./selectors";
import debounce from "lodash.debounce";

export default function AddressSearch({ current, onChooseAddress }) {
  const dispatch = useDispatch();
  const [val, setVal] = useState('');
  const results = useSelector(getSingleStringTopResults);

  const search = useCallback(
    debounce((query) => { dispatch(singleStringSearch({ query })) }, 300)
  , [dispatch]);

  const onChange = useCallback((evt) => {
    const val = evt.target.value;

    setVal(evt.target.value);
    search(val);
  }, [search]);

  return (
    <div>
      <input onChange={onChange} type="text" value={val} />
      <ul>
        {results.map((r) => (
          <li className={current === r.name ? 'green-bg' : undefined} key={r.name}>
            {r.name} <span onClick={() => onChooseAddress(r)} className="btn-like">use it</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
