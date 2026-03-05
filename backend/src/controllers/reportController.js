import Report from "../models/report.js";

export const submitReport = async (req, res) => {
  try {
    const { latitude, longitude, category, severity, description } = req.body;

    /* INPUT VALIDATION */

    if (!latitude || !longitude || !category || !severity) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({
        message: "Invalid coordinates"
      });
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({
        message: "Latitude out of range"
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({
        message: "Longitude out of range"
      });
    }

    if (severity < 1 || severity > 5) {
      return res.status(400).json({
        message: "Severity must be between 1 and 5"
      });
    }

    /* CREATE REPORT */

    const report = new Report({
      location: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      category,
      severity,
      description
    });

    await report.save();

    res.status(201).json({
      message: "Report submitted successfully"
    });

  } catch (error) {
    console.error("Error submitting report:", error);

    res.status(500).json({
      message: "Failed to submit report"
    });
  }
};


export const getReports = async (req, res) => {
  try {

    const reports = await Report.find();

    res.status(200).json(reports);

  } catch (error) {

    console.error("Error fetching reports:", error);

    res.status(500).json({
      message: "Failed to fetch reports"
    });

  }
};