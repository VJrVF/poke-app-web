import React from 'react';

import './css/TrainerList.css';

const TrainerList = props => {
  return (
    <section className="trainer-list">
      <h2>Loaded Trainers</h2>
      <ul>
        {props.trainers.map(trainer => (
          <li key={trainer._id} onClick={props.onRemoveItem.bind(this, trainer._id)}>
            <span>{trainer.name}</span>
            <span>{trainer.dni}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrainerList;
