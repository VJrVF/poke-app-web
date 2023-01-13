import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import './css/Search.css';
import useDebounce from './hooks/useDebounce';
import getLoadedTrainers from './utils/getLoadedTrainers';

const Search = React.memo(({ onLoadTrainers }) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const debouncedValue = useDebounce(enteredFilter, 500)
  const inputRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const currentFilter = inputRef.current.value;
        const { loadedTrainers } = await getLoadedTrainers(enteredFilter, currentFilter);
        onLoadTrainers(loadedTrainers);
      } catch (err) {
        console.log("error", err);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Name</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
