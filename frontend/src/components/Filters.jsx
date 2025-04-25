import React, {useReducer, useEffect} from 'react'
import { getAnimalsAPI } from '../api/animalsAPI'
import debounce from 'debounce'


const filtersPlaceholder = {
      q: '',
      aplinka: '',
      sort: '',
      order: '',
      lt: false
}   

function reducer(state, action) {
      switch (action.type) {
            case 'q':
                  return {...state, q:action.payload}
                  
            case 'aplinka':
                  return {...state, aplinka: action.payload}

            case 'sort':
                  return {...state, sort: action.payload}

            case 'order':
                  return {...state, order: action.payload}

            case 'lt':
                  return {...state, lt: !state.lt}

            default:
                  return state;
      }

}

const debounceFetch = debounce((params) => {getAnimalsAPI(params)},250)


const Filters = () => {
      const [filters, dispatch] = useReducer(reducer, filtersPlaceholder)
      

      useEffect(() => {

            const params = new URLSearchParams({
                  q: filters.q,
                  sort: filters.sort,
                  order: filters.order,
                  aplinka: filters.aplinka,
                  lt: filters.lt
            })
            
            debounceFetch(params)

      },[filters])

      return (
            <div>
                  <input
                        type="search"
                        placeholder="Search…"
                        value={filters.q}
                        onChange={e => dispatch({ type: 'q', payload: e.target.value })}
                  />

                  <label>
                        <input
                        type="checkbox"
                        checked={filters.lt}
                        onChange={() => dispatch({ type: "lt" })}
                        />
                        lt
                  </label>

                  <button onClick={() => dispatch({type: 'sort', payload: 'svoris'})}>Svoris</button>
                  <button onClick={() => dispatch({type: 'sort', payload: 'rusis'})}>Rusis</button>
                  <button onClick={() => dispatch({type: 'sort', payload: 'vardas'})}>Pavadinimas</button>
                  <button onClick={() => dispatch({type: 'order', payload: 'asc'})}>ASC</button>
                  <button onClick={() => dispatch({type: 'order', payload: 'desc'})}>DESC</button>

                  <label>
                        Aplinka:{' '}
                        <select
                              value={filters.aplinka}
                              onChange={(e) => dispatch({type: 'aplinka', payload: e.target.value})}
                        >
                              <option value="">Visi</option>
                              <option value="oras">Oras</option>
                              <option value="sausuma">Sausuma</option>
                              <option value="vanduo">Vanduo</option>
                              <option value="po zeme">Po zeme</option>
                        </select>
                  </label>
            </div>
      )
}

export default Filters
