import { useState } from "react";
import { STATUS_PIPELINE } from "../data/mockData";

export default function AddDogForm({ onAdd }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(STATUS_PIPELINE[0]);
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !status.trim()) return;
    onAdd({ name, status, image, updates: [] });
    setName("");
    setStatus(STATUS_PIPELINE[0]);
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
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        marginBottom: 30,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 12,
      }}
    >
      <input
        type="text"
        placeholder="Dog Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ cursor: "pointer" }}
      >
        {STATUS_PIPELINE.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <label
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#2c3e50",
        }}
      >
        📸 Choose Photo
        <input
          type="file"
          onChange={handleImage}
          style={{ display: "none" }}
        />
      </label>
      <button type="submit" style={{ gridColumn: "auto" }}>
        ➕ Add Dog
      </button>
    </form>
  );
}

