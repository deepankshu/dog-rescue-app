import DogCard from "./DogCard";

// export default function DogList({ dogs }) {
//   return (
//     <div>
//       {dogs.map((dog) => (
//         <DogCard key={dog.id} dog={dog} />
//       ))}
//     </div>
//   );
// }

export default function DogList({ dogs, onUpdateStatus }) {
  return (
    <div>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}
