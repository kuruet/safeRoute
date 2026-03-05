import mongoose from "mongoose";
import dotenv from "dotenv";
import Report from "../src/models/report.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const clusters = [
  {
    name: "Kurla",
    lat: 19.0728,
    lng: 72.8826,
    count: 50,
    minDays: 0,
    maxDays: 7
  },
  {
    name: "Ghatkopar",
    lat: 19.0856,
    lng: 72.9081,
    count: 30,
    minDays: 5,
    maxDays: 20
  },
  {
    name: "Sion",
    lat: 19.0470,
    lng: 72.8618,
    count: 15,
    minDays: 10,
    maxDays: 30
  },
  {
    name: "Chembur",
    lat: 19.0522,
    lng: 72.9005,
    count: 15,
    minDays: 40,
    maxDays: 90
  }
];

const categories = [
  "Poor Lighting",
  "Harassment",
  "Suspicious Activity",
  "Drunk Individuals",
  "Isolated Area",
  "Lack of Police Presence"
];

function randomOffset() {
  return (Math.random() - 0.5) * 0.008;
}

function randomSeverity() {
  const r = Math.random();

  if (r < 0.1) return 1;
  if (r < 0.3) return 2;
  if (r < 0.6) return 3;
  if (r < 0.85) return 4;
  return 5;
}

function randomDate(minDays, maxDays) {
  const daysAgo = minDays + Math.random() * (maxDays - minDays);
  return new Date(Date.now() - daysAgo * 86400000);
}

function randomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

async function seedReports() {

  await mongoose.connect(MONGO_URI);

  console.log("Connected to MongoDB");

  await Report.deleteMany({});

  const reports = [];

  clusters.forEach(cluster => {

    for (let i = 0; i < cluster.count; i++) {

      const lat = cluster.lat + randomOffset();
      const lng = cluster.lng + randomOffset();

      reports.push({

        location: {
          type: "Point",
          coordinates: [lng, lat]
        },

        category: randomCategory(),

        severity: randomSeverity(),

        description: `Safety issue near ${cluster.name}`,

        createdAt: randomDate(cluster.minDays, cluster.maxDays)

      });

    }

  });

  await Report.insertMany(reports);

  console.log(`Inserted ${reports.length} reports`);

  mongoose.connection.close();

}

seedReports();