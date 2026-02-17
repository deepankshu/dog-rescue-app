import { useState } from "react";

export default function AddDogForm({ onAdd }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !status.trim()) return;
    onAdd({ name, status, image });
    setName("");
    setStatus("");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Dog Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <input type="file" onChange={handleImage} />
      <button type="submit">Add Dog</button>
    </form>
  );
}

