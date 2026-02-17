export default function DogCard({ dog, onUpdateStatus }) {
  return (
    <div style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
      {dog.image && <img src={dog.image} alt={dog.name} width="150" />}
      <h3>{dog.name}</h3>
      <p>Status: {dog.status}</p>

      <button onClick={() => onUpdateStatus(dog.id, "Recovering")}>
        Mark as Recovering
      </button>
    </div>
  );
}
