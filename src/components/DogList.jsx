import DogCard from "./DogCard";

export default function DogList({ dogs, onUpdateStatus, onAddUpdate }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
        marginTop: 20,
      }}
    >
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onUpdateStatus={onUpdateStatus}
          onAddUpdate={onAddUpdate}
        />
      ))}
    </div>
  );
}
