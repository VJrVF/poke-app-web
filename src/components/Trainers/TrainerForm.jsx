import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import AutoComplete from './AutocompleteBar';
import './css/TrainerForm.css';

const TrainerForm = React.memo(props => {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [data, setData] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    props.onAddTrainer({ name, dni, pokemons});
  };

  useEffect(() => {
    const url = "https://localhost:3001/v1/pokemons"
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const pokemons = await response.json();
        setData(pokemons);
      } catch (e) {
        console.log("error", e);
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
            <AutoComplete data={data} handlePokemon={setPokemons} />
          </div>
          <div className="trainer-form__actions">
            <button type="submit">Add Trainer</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default TrainerForm;
