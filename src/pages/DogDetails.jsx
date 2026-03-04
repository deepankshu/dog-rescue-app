import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { STATUS_PIPELINE } from "../data/mockData";

export default function DogDetails({ dogs, onUpdateStatus, onAddUpdate }) {
  const { id } = useParams();
  const dog = dogs.find((d) => String(d.id) === String(id));

  if (!dog) {
    return (
      <div>
        <p>Dog not found.</p>
        <Link to="/">← Back</Link>
      </div>
    );
  }
const [note, setNote] = useState("");
const [photo, setPhoto] = useState("");

const handlePhoto = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => setPhoto(reader.result);
  if (file) reader.readAsDataURL(file);
};

const submitUpdate = () => {
  if (!note.trim() && !photo) return;

  onAddUpdate(dog.id, {
    id: Date.now(),
    note: note.trim(),
    photo,
    date: new Date().toLocaleString(),
  });

  setNote("");
  setPhoto("");
};

const getStatusColor = (status) => {
  const colors = {
    "Rescued": { bg: "#fff3cd", text: "#856404" },
    "In Treatment": { bg: "#f8d7da", text: "#721c24" },
    "Recovering": { bg: "#d1ecf1", text: "#0c5460" },
    "Ready for Adoption": { bg: "#d4edda", text: "#155724" },
    "Adopted": { bg: "#cce5ff", text: "#004085" },
    "Released": { bg: "#e2e3e5", text: "#383d41" },
    "Critical": { bg: "#f5c6cb", text: "#721c24" },
  };
  return colors[status] || { bg: "#e9ecef", text: "#383d41" };
};

const statusColor = getStatusColor(dog.status);

  return (
    <div>
      <Link to="/" style={{ fontSize: "1.1em", marginBottom: 20, display: "inline-block" }}>
        ← Back to Dashboard
      </Link>

      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginTop: 20,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, marginBottom: 8 }}>{dog.name}</h2>
            <p style={{ color: "#7f8c8d", margin: 0 }}>Dog ID: {dog.id}</p>
          </div>
          {dog.image && (
            <img
              src={dog.image}
              alt={dog.name}
              style={{
                width: 180,
                height: 180,
                borderRadius: 20,
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <div
          style={{
            padding: 16,
            backgroundColor: statusColor.bg,
            color: statusColor.text,
            borderRadius: 20,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          <div style={{ marginBottom: 10 }}>Current Status: <strong>{dog.status}</strong></div>
          <label htmlFor="status-select" style={{ display: "block", marginBottom: 8 }}>
            Update Status:
          </label>
          <select
            id="status-select"
            value={dog.status}
            onChange={(e) => onUpdateStatus(dog.id, e.target.value)}
            style={{ cursor: "pointer", minWidth: 200 }}
          >
            {STATUS_PIPELINE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <hr />

        <h3 style={{ marginTop: 24 }}>Add Treatment Update</h3>
        <div
          style={{
            display: "grid",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <input
            type="text"
            placeholder="Note (medicine, diet, exam results, etc.)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <label
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#2c3e50",
              fontWeight: 500,
            }}
          >
            📸 Choose Photo
            <input
              type="file"
              onChange={handlePhoto}
              style={{ display: "none" }}
            />
          </label>
          <button
            onClick={submitUpdate}
            style={{
              backgroundColor: "#27ae60",
              color: "white",
              padding: "12px 20px",
            }}
          >
            ✅ Add Update
          </button>
        </div>

        <hr />

        <h3>Treatment Updates ({dog.updates?.length || 0})</h3>
        {dog.updates?.length ? (
          dog.updates.map((u) => (
            <div
              key={u.id}
              style={{
                marginBottom: 16,
                padding: 14,
                backgroundColor: "#f8f9fa",
                borderRadius: 20,
                borderLeft: "4px solid #2980b9",
              }}
            >
              <div style={{ fontSize: 13, color: "#7f8c8d", marginBottom: 10, fontWeight: 500 }}>
                📅 {u.date}
              </div>
              {u.note && <div style={{ marginBottom: 10 }}>{u.note}</div>}
              {u.photo && (
                <img
                  src={u.photo}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    borderRadius: 20,
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <p style={{ color: "#95a5a6", fontStyle: "italic", padding: 14, backgroundColor: "#f8f9fa", borderRadius: 20 }}>
            No updates yet. Start documenting the recovery journey! 📝
          </p>
        )}
      </div>
    </div>
  );
}