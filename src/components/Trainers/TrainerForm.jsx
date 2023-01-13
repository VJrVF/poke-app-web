import React, { useEffect, useState } from 'react';
import { listPokemons } from '../Services/pokemon-service';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import AutoCompleteBar from './AutocompleteBar';
import './css/TrainerForm.css';

const TrainerForm = React.memo(({ onAddTrainer, loading }) => {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [data, setData] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    onAddTrainer({ name, dni, pokemons });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemons = await listPokemons();
        setData(pokemons);
      } catch (err) {
        console.log("error", err);
      }

    }
    fetchData();
  }, []);

  return (
    <section className="trainer-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={event => {
                setDni(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Starter Pokemon</label>
            <AutoCompleteBar items={data} selectItem={setPokemons} />
          </div>
          <div className="trainer-form__actions">
            <button type="submit">Add Trainer</button>
            {loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default TrainerForm;
