import React, { useState, useEffect, useCallback } from 'react';

import TrainerForm from './TrainerForm';
import TrainerList from './TrainerList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Trainers = () => {
  const [userTrainer, setUserTrainer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING TRAINERS', userTrainer);
  }, [userTrainer]);

  const filteredTrainersHandler = useCallback(filteredTrainers => {
    setUserTrainer(filteredTrainers);
  }, []);

  const addTrainerHandler = trainer => {
    setIsLoading(true);
    fetch('http://localhost:3001/v1/trainers', {
      method: 'POST',
      body: JSON.stringify(trainer),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setIsLoading(false);
        return response.json();
      })
      .then(() => {
        setUserTrainer(prevTrainers => [
          ...prevTrainers,
          { ...trainer }
        ]);
      });
  };

  const removeTrainerHandler = trainerID => {
    setIsLoading(true);
    fetch('http://localhost:3001/v1/trainers', {
      method: 'DELETE',
      body: JSON.stringify(trainerID),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false);
      setUserTrainer(prevTrainers =>
        prevTrainers.filter(trainer => trainer._id !== trainerID)
      );
    }).catch(error => {
      setError('Something went wrong!');
      setIsLoading(false);
    });
  };

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <TrainerForm
        onAddTrainer={addTrainerHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadTrainers={filteredTrainersHandler} />
        <TrainerList
          trainers={userTrainer}
          onRemoveItem={removeTrainerHandler}
        />
      </section>
    </div>
  );
};

export default Trainers;
