import React from 'react';

import './css/TrainerList.css';

const TrainerList = ({onRemoveItem, trainers}) => {
  return (
    <section className="trainer-list">
      <h2>Loaded Trainers</h2>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer._id} onClick={() => onRemoveItem(trainer._id)}>
            <span>{trainer.name}</span>
            <span>{trainer.dni}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrainerList;
