import { API_URL, pokemonApi } from './api'

const TRAINER_URL = `${API_URL}/v1/pokemons`;

export const listPokemons = async () => {
  const pokemons = await pokemonApi.get(TRAINER_URL)
  return pokemons;
}