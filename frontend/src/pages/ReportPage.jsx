import React, { useState } from "react";
import Header from "../components/Header";
import ReportMap from "../components/report/ReportMap";
import ReportStepperForm from "../components/report/ReportStepperForm";
import Footer from "../components/Footer";

function ReportPage() {

  const [location, setLocation] = useState(null);

  return (

    <div>

      <Header />

      {/* Community message */}

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px",
          textAlign: "center"
        }}
      >

        <h1>Community Safety Reporting</h1>

        <p style={{ color: "#6B7280" }}>
          Help the community travel safer by reporting unsafe areas,
          poor lighting, suspicious activity, or other concerns.
        </p>

      </div>


      {/* Map */}

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 20px"
        }}
      >

        <ReportMap
          location={location}
          setLocation={setLocation}
        />

      </div>


      {/* Form */}

      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          padding: "0 20px"
        }}
      >

        <ReportStepperForm
          location={location}
          setLocation={setLocation}
        />

      </div>

      <Footer/>

    </div>

  );

}

export default ReportPage;