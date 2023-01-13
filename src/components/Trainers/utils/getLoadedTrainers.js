import { searchTrainer } from "../../Services/trainer-service";

const getLoadedTrainers = async (enteredFilter, currentFilter) => {
  const loadedTrainers = [];
  if (enteredFilter === currentFilter) {
    const input = enteredFilter.length === 0 ? "" : enteredFilter;
    const payload = { value: input };

    const { data: trainersFiltered } = await searchTrainer(payload);

    trainersFiltered.forEach((trainer) => {
      loadedTrainers.push({
        name: trainer.name,
        dni: trainer.dni,
      });
    });
  }
  return loadedTrainers;
};

export default getLoadedTrainers;
