import React, { useState } from "react";

import { API_BASE } from "../config/api";

const ReportModal = ({ isOpen, onClose }) => {

  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState(3);
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const submitReport = async () => {

    try {

      const response = await fetch(`${API_BASE}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category,
          severity,
          description
        })
      });

      await response.json();

      alert("Safety report submitted");

      onClose();

    } catch (error) {

      console.error("Report failed", error);

    }

  };

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      }}
    >

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "10px",
          width: "350px"
        }}
      >

        <h2 style={{ marginBottom: "12px" }}>
          Report Safety Issue
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="">Select category</option>
          <option>Poor Lighting</option>
          <option>Harassment</option>
          <option>Isolated Area</option>
          <option>Suspicious Activity</option>
          <option>Drunk Individuals</option>
          <option>Lack of Police Presence</option>
          <option>Other</option>
        </select>

        <select
          value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value={1}>1 — Very Low</option>
          <option value={2}>2 — Low</option>
          <option value={3}>3 — Moderate</option>
          <option value={4}>4 — High</option>
          <option value={5}>5 — Critical</option>
        </select>

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px"
          }}
        />

        <button
          onClick={submitReport}
          style={{
            width: "100%",
            padding: "10px",
            background: "#DC2626",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Submit Report
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px"
          }}
        >
          Cancel
        </button>

      </div>

    </div>

  );

};

export default ReportModal;