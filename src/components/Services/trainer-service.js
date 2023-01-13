import { API_URL, pokemonApi } from './api'

const TRAINER_URL = `${API_URL}/v1/trainers`;

export const addTrainer = async (trainer) => {
  const newTrainer = await pokemonApi.post(TRAINER_URL, trainer)
  return newTrainer;
}

export const removeTrainer = async (trainerID) => {
  await pokemonApi.delete(TRAINER_URL, trainerID)
}

export const searchTrainer = async (input) => {
  const filterTrainers = await pokemonApi.post(`${TRAINER_URL}/filterByName`, input)
  return filterTrainers;
}