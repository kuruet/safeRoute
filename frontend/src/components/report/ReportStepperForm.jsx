import React, { useEffect, useState } from "react";

import { API_BASE } from "../../config/api";

const ReportStepperForm = ({ location, setLocation }) => {

  const [step, setStep] = useState(1);

  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState(3);
const [useCurrentTime, setUseCurrentTime] = useState(true);
const [incidentTime, setIncidentTime] = useState("");  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Reverse geocode when location changes
  useEffect(() => {

    if (!location) return;

    const reverseGeocode = async () => {

      try {

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
        );

        const data = await response.json();

        setAddress(data.display_name || "");
        setSearchQuery(data.display_name || "");

      } catch (error) {

        console.error("Reverse geocoding failed", error);

      }

    };

    reverseGeocode();

  }, [location]);

  // Location autocomplete search
  const searchLocation = async (query) => {

    if (!query) {
      setSuggestions([]);
      return;
    }

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );

      const data = await response.json();

      setSuggestions(data);

    } catch (error) {

      console.error("Location search failed", error);

    }

  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const resetForm = () => {

    setStep(1);
    setCategory("");
    setSeverity(3);
    setIncidentTime("");
    setDescription("");
    setAddress("");
    setSearchQuery("");
    setSuggestions([]);

  };

  const submitReport = async () => {

    if (!location) {
      setToast({ type: "error", message: "Please select location on the map." });
      return;
    }

    try {

      setLoading(true);

      const response =await fetch(`${API_BASE}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
  latitude: location.latitude,
  longitude: location.longitude,
  category,
  severity,
  description,
  time: useCurrentTime ? new Date().toISOString() : incidentTime
})
      });

      await response.json();

      setToast({
        type: "success",
        message: "Report submitted successfully. Thank you for helping the community."
      });

      resetForm();

    } catch (error) {

      console.error("Report submission failed", error);

      setToast({
        type: "error",
        message: "Failed to submit report. Please try again."
      });

    } finally {

      setLoading(false);

      setTimeout(() => setToast(null), 4000);

    }

  };

  return (

    <div
      style={{
        marginTop: "30px",
        padding: "24px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >

      <h2 style={{ marginBottom: "20px" }}>
        Report Unsafe Area
      </h2>

      {/* STEP 1 — LOCATION */}

      {step === 1 && (

        <div>

          <h3>Confirm Location</h3>

          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              searchLocation(value);
            }}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          {suggestions.length > 0 && (

            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                marginTop: "6px",
                maxHeight: "150px",
                overflowY: "auto",
                background: "white"
              }}
            >

              {suggestions.map((place) => (

                <div
                  key={place.place_id}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee"
                  }}
                  onClick={() => {

                    const lat = parseFloat(place.lat);
                    const lon = parseFloat(place.lon);

                    setLocation({
                      latitude: lat,
                      longitude: lon
                    });

                    setSearchQuery(place.display_name);
                    setSuggestions([]);

                  }}
                >

                  {place.display_name}

                </div>

              ))}

            </div>

          )}

        </div>

      )}

      {/* STEP 2 */}

      {step === 2 && (

        <div>

          <h3>Select Category</h3>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          >

            <option value="">Select category</option>
            <option>Poor Lighting</option>
            <option>Harassment</option>
            <option>Suspicious Activity</option>
            <option>Drunk Individuals</option>
            <option>Lack of Police Presence</option>
            <option>Isolated Area</option>
            <option>Other</option>

          </select>

        </div>

      )}

      {/* STEP 3 */}

      {step === 3 && (

        <div>

          <h3>Severity Level</h3>

          <select
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          >

            <option value={1}>1 — Very Low</option>
            <option value={2}>2 — Low</option>
            <option value={3}>3 — Moderate</option>
            <option value={4}>4 — High</option>
            <option value={5}>5 — Critical</option>

          </select>

        </div>

      )}

    {/* STEP 4 */}

{step === 4 && (

  <div>

    <h3>Time of Incident</h3>

    <div style={{ marginTop: "10px" }}>

      <label style={{ display: "block", marginBottom: "8px" }}>
        <input
          type="radio"
          checked={useCurrentTime}
          onChange={() => setUseCurrentTime(true)}
        />
        {" "}Current Time
      </label>

      <label>
        <input
          type="radio"
          checked={!useCurrentTime}
          onChange={() => setUseCurrentTime(false)}
        />
        {" "}Select Custom Time
      </label>

    </div>

    {!useCurrentTime && (

      <input
        type="datetime-local"
        value={incidentTime}
        onChange={(e) => setIncidentTime(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "12px"
        }}
      />

    )}

  </div>

)}

      {/* STEP 5 */}

      {step === 5 && (

        <div>

          <h3>Description (Optional)</h3>

          <textarea
            placeholder="Describe what happened (optional)..."
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              height: "120px"
            }}
          />

        </div>

      )}

      {/* STEP 6 */}

      {step === 6 && (

        <div>

          <h3>Review Report</h3>

          <p><strong>Location:</strong> {searchQuery}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Severity:</strong> {severity}</p>
          <p><strong>Description:</strong> {description || "None"}</p>

        </div>

      )}

      {/* Navigation Buttons */}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >

        {step > 1 && (
          <button onClick={prevStep}>
            Back
          </button>
        )}

        {step < 6 && (
          <button
            onClick={nextStep}
            style={{
              background: "#14B8A6",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px"
            }}
          >
            Next
          </button>
        )}

        {step === 6 && (
          <button
            onClick={submitReport}
            disabled={loading}
            style={{
              background: "#DC2626",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px"
            }}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        )}

      </div>

      {/* Toast */}

      {toast && (

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            borderRadius: "6px",
            background: toast.type === "success" ? "#DCFCE7" : "#FEE2E2",
            color: toast.type === "success" ? "#166534" : "#991B1B"
          }}
        >
          {toast.message}
        </div>

      )}

    </div>

  );

};

export default ReportStepperForm;