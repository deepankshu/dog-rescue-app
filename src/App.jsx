import { useState } from "react";
import { initialDogs } from "./data/mockData";
import AddDogForm from "./components/AddDogForm";
import DogList from "./components/DogList";

export default function App() {
  const [dogs, setDogs] = useState(initialDogs);

  const addDog = (newDog) => {
    setDogs([...dogs, { ...newDog, id: Date.now() }]);
  };

  const updateDogStatus = (id, newStatus) => {
  setDogs(dogs.map((dog) => (dog.id === id ? { ...dog, status: newStatus } : dog)));
};


  return (
    <div style={{ padding: 20 }}>
      <h1>Dog Rescue Dashboard</h1>
      <AddDogForm onAdd={addDog} />
      <DogList dogs={dogs} onUpdateStatus={updateDogStatus} />
    </div>
  );
}





