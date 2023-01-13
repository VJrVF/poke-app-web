import React, { useState, useCallback } from 'react';

import TrainerForm from './TrainerForm';
import TrainerList from './TrainerList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import { addTrainer, removeTrainer } from '../Services/trainer-service';

const Trainers = () => {
  const [userTrainer, setUserTrainer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredTrainersHandler = useCallback(filteredTrainers => {
    setUserTrainer(filteredTrainers);
  }, []);

  const addTrainerHandler = async trainer => {
    setIsLoading(true);
    try {
      const newTrainer = await addTrainer(trainer);
      setUserTrainer(prevTrainers => [...prevTrainers, { ...newTrainer }]);
    } catch (err) {
      setError(`Something went wrong. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTrainerHandler = async trainerId => {
    setIsLoading(true);
    try {
      await removeTrainer(trainerId)
      setUserTrainer(prevTrainers => prevTrainers.filter(trainer => trainer._id !== trainerId));
    } catch (err) {
      setError(`Something went wrong. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError} errorMessage={error} />}

      <TrainerForm
        onAddTrainer={addTrainerHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadTrainers={filteredTrainersHandler} />
        <TrainerList
          trainers={userTrainer}
          onRemoveTrainer={removeTrainerHandler}       
        />
      </section>
    </div>
  );
};

export default Trainers;
