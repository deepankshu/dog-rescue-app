import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DogCard({ dog, onUpdateStatus, onAddUpdate }) {
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

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
      "Rescued": { bg: "#fff3cd", text: "#856404", icon: "🆘" },
      "In Treatment": { bg: "#f8d7da", text: "#721c24", icon: "⚕️" },
      "Recovering": { bg: "#d1ecf1", text: "#0c5460", icon: "💪" },
      "Ready for Adoption": { bg: "#d4edda", text: "#155724", icon: "🏡" },
      "Adopted": { bg: "#cce5ff", text: "#004085", icon: "❤️" },
      "Released": { bg: "#e2e3e5", text: "#383d41", icon: "🦁" },
      "Critical": { bg: "#f5c6cb", text: "#721c24", icon: "🚨" },
    };
    return colors[status] || { bg: "#e9ecef", text: "#383d41", icon: "📌" };
  };

  const statusColor = getStatusColor(dog.status);

  return (
    <div
      style={{
        borderRadius: 20,
        padding: 18,
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        cursor: "default",
        border: "1px solid #ecf0f1",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.1)")
      }
    >
      {dog.image && (
        <img
          src={dog.image}
          alt={dog.name}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 20,
            marginBottom: 14,
          }}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: "1.4em" }}>{dog.name}</h3>
        <span
          style={{
            padding: "6px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            backgroundColor: statusColor.bg,
            color: statusColor.text,
            whiteSpace: "nowrap",
          }}
        >
          {statusColor.icon} {dog.status}
        </span>
      </div>

      {dog.updates?.length > 0 && (
        <div
          style={{
            fontSize: 13,
            padding: 10,
            backgroundColor: "#f8f9fa",
            borderRadius: 20,
            marginBottom: 12,
            borderLeft: "3px solid #2980b9",
          }}
        >
          <strong>Latest Update:</strong> {dog.updates[dog.updates.length - 1].note || "📷 Photo update"}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button
          onClick={() => navigate(`/dog/${dog.id}`)}
          style={{ flex: 1, backgroundColor: "#2980b9" }}
        >
          📋 View Details
        </button>
      </div>

      <hr />

      <h4 style={{ fontSize: "1em", marginBottom: 10 }}>Add Treatment Update</h4>
      <input
        type="text"
        placeholder="Note (medicine, feeding, etc.)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <label
        style={{
          display: "block",
          cursor: "pointer",
          marginBottom: 10,
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
          width: "100%",
          backgroundColor: "#27ae60",
          marginBottom: 14,
        }}
      >
        ✅ Add Update
      </button>

      <hr />

      <h4 style={{ fontSize: "1em", marginBottom: 10 }}>Updates ({dog.updates?.length || 0})</h4>
      {dog.updates?.length ? (
        dog.updates.map((u) => (
          <div
            key={u.id}
            style={{
              marginBottom: 12,
              padding: 10,
              backgroundColor: "#f8f9fa",
              borderRadius: 20,
              borderLeft: "3px solid #3498db",
            }}
          >
            <div style={{ fontSize: 12, color: "#7f8c8d", marginBottom: 6 }}>
              📅 {u.date}
            </div>
            {u.note && <div style={{ marginBottom: 8 }}>{u.note}</div>}
            {u.photo && <img src={u.photo} alt="" style={{ maxWidth: "100%", borderRadius: 20 }} />}
          </div>
        ))
      ) : (
        <p style={{ color: "#95a5a6", fontStyle: "italic" }}>No updates yet. 👀</p>
      )}
    </div>
  );

}
