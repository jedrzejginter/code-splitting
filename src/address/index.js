import debounce from "lodash.debounce";
import { useState, useCallback } from "react";

import { singleStringSearch } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStringTopResults } from "./selectors";

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
          <li
            css={{ background: current && current.name === r.name ? 'green' : undefined}}
            key={r.name}
          >
            {r.name}{' '}
            <button
              css={{
                cursor: 'pointer',
                border: '1px solid #000',
                ':hover': {
                  backgroundColor: '#000',
                  color: '#fff'
                }
              }}
              onClick={() => onChooseAddress(r)}
            >
              use it
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
