import { useEffect, useState } from "react";
import AddDogForm from "./components/AddDogForm";
import DogList from "./components/DogList";
import { Routes, Route } from "react-router-dom";
import DogDetails from "./pages/DogDetails";

export default function App() {
  const [dogs, setDogs] = useState(() => {
    try {
      const saved = localStorage.getItem("dogs");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      localStorage.removeItem("dogs");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dogs", JSON.stringify(dogs));
  }, [dogs]);

  const addDog = (newDog) => {
    setDogs([...dogs, { ...newDog, id: Date.now() }]);
  };

  const updateDogStatus = (id, newStatus) => {
    setDogs(
      dogs.map((dog) => (dog.id === id ? { ...dog, status: newStatus } : dog))
    );
  };

  const addDogUpdate = (dogId, newUpdate) => {
    setDogs(
      dogs.map((dog) =>
        dog.id === dogId
          ? { ...dog, updates: [...(dog.updates || []), newUpdate] }
          : dog
      )
    );
  };

  const clearAll = () => {
    localStorage.removeItem("dogs");
    setDogs([]);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "30px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ marginBottom: 8 }}>🐕 Dog Rescue Dashboard</h1>
          <p style={{ color: "#7f8c8d", fontSize: "1.1em", marginBottom: 0 }}>
            Track rescue cases and treatment progress
          </p>
        </div>

            <Routes>
          <Route
            path="/"
            element={
              <>
                <div style={{ marginBottom: 24 }}>
                  <button
                    onClick={clearAll}
                    style={{
                      backgroundColor: "#e74c3c",
                      padding: "8px 16px",
                      fontSize: "0.9em",
                    }}
                  >
                    🗑️ Clear All Dogs
                  </button>
                </div>
            <AddDogForm onAdd={addDog} />
            <DogList
              dogs={dogs}
              onUpdateStatus={updateDogStatus}
              onAddUpdate={addDogUpdate}
            />
          </>
        }
      />

          <Route
            path="/dog/:id"
            element={
              <DogDetails
                dogs={dogs}
                onUpdateStatus={updateDogStatus}
                onAddUpdate={addDogUpdate}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}