import React, { useReducer, useEffect } from "react";
import { getAnimalsAPI } from "../api/animalsAPI";
import debounce from "debounce";

const filtersPlaceholder = {
  q: "",
  aplinka: "",
  sort: "",
  order: "",
  lt: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "q":
      return { ...state, q: action.payload };

    case "aplinka":
      return { ...state, aplinka: action.payload };

    case "sort":
      return { ...state, sort: action.payload };

    case "order":
      return { ...state, order: action.payload };

    case "lt":
      return { ...state, lt: !state.lt };

    default:
      return state;
  }
}

const Filters = ({ onChange }) => {
  const [filters, dispatch] = useReducer(reducer, filtersPlaceholder);

  useEffect(() => {
    const params = new URLSearchParams({
      q: filters.q,
      sort: filters.sort,
      order: filters.order,
      aplinka: filters.aplinka,
      lt: filters.lt,
    });

    debounce(() => onChange(filters), 250)();
  }, [filters, onChange]);

  const isActive = (property, value) => filters[property] === value ? 'active' : ''

  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Search…"
        value={filters.q}
        onChange={(e) => dispatch({ type: "q", payload: e.target.value })}
      />

      <label>
        <input
          type="checkbox"
          checked={filters.lt}
          onChange={() => dispatch({ type: "lt" })}
        />
        lt
      </label>

      <button className={isActive('sort', 'svoris')} onClick={() => dispatch({ type: "sort", payload: "svoris" })}>
        Svoris
      </button>
      <button className={isActive('sort', 'rusis')} onClick={() => dispatch({ type: "sort", payload: "rusis" })}>
        Rusis
      </button>
      <button className={isActive('sort', 'vardas')} onClick={() => dispatch({ type: "sort", payload: "vardas" })}>
        Pavadinimas
      </button>
      <button className={isActive('order', 'asc')} onClick={() => dispatch({ type: "order", payload: "asc" })}>
        ASC
      </button>
      <button className={isActive('order', 'desc')} onClick={() => dispatch({ type: "order", payload: "desc" })}>
        DESC
      </button>

      <label>
        Aplinka:{" "}
        <select
          value={filters.aplinka}
          onChange={(e) =>
            dispatch({ type: "aplinka", payload: e.target.value })
          }
        >
          <option value="">Visi</option>
          <option value="oras">Oras</option>
          <option value="sausuma">Sausuma</option>
          <option value="vanduo">Vanduo</option>
          <option value="po zeme">Po zeme</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
