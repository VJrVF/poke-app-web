import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './css/Search.css';

const Search = React.memo(props => {
  const { onLoadTrainers } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const input =
          enteredFilter.length === 0
            ? ''
            : enteredFilter;
      
        fetch(
          'https://localhost:3001/v1/trainers/filterByName',
          {
            method: 'POST',
            body: JSON.stringify({
              value: input
            }),
            headers: { 'Content-Type': 'application/json' }
          }
        )
          .then(response => response.json())
          .then(responseData => {
            const { data } = responseData
            const loadedTrainers = [];

            data.forEach(trainer => {
              loadedTrainers.push({
                name: trainer.name,
                dni: trainer.dni
              });
            });
            onLoadTrainers(loadedTrainers);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadTrainers, inputRef]);

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
