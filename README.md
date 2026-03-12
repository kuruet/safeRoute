🛡️ Safe Route Navigation System
Safety-Aware Navigation for Women

A navigation system that recommends the safest route instead of the shortest route by analyzing safety-related data and calculating risk scores for different paths.

Unlike traditional navigation systems that optimize only for distance or time, this project introduces risk-aware routing designed to help users make safer travel decisions.

🧠 The Problem

Most navigation platforms like Google Maps focus on:

shortest distance

fastest travel time

But they do not consider personal safety.

This becomes a major issue for people traveling:

at night

through unfamiliar locations

in areas with safety concerns

Users may unknowingly travel through high-risk locations simply because the route is shorter.

💡 The Idea

What if a navigation system could recommend the safest route instead of just the shortest one?

This project introduces a risk-aware routing system that evaluates multiple routes and calculates a safety score for each one.

The system:

1️⃣ Fetches multiple possible routes
2️⃣ Breaks each route into smaller road segments
3️⃣ Evaluates safety risk for each segment
4️⃣ Calculates total route risk
5️⃣ Recommends the route with the lowest risk score

Users still see multiple route options, but the safest route is highlighted.

✨ Key Features
🧭 Safety-Aware Route Recommendation

Routes are ranked based on safety risk rather than distance alone.

📊 Weighted Risk Scoring Algorithm

Each route segment receives a risk score based on safety data and contextual factors.

🗺️ Map-Based Visualization

Routes and safety levels are displayed visually on an interactive map.

👥 Crowdsourced Safety Reporting

Users can report:

unsafe locations

suspicious activity

dangerous areas

These reports influence future route calculations.

⚡ Real-Time Route Evaluation

Routes are processed dynamically when the user searches for directions.

🏗 System Architecture

The application follows a full-stack architecture with external routing APIs.

User Input (Source + Destination)
           │
           ▼
Frontend (React)
           │
           ▼
Backend API (Node.js + Express)
           │
           ├── Route Fetching (OpenRouteService API)
           ├── Safety Data Evaluation
           ├── Risk Scoring Algorithm
           │
           ▼
Database (MongoDB)
           │
           ▼
Ranked Route Results
           │
           ▼
Frontend Map Visualization
⚙️ Technology Stack
🎨 Frontend

React.js

Map visualization libraries

HTML / CSS

Responsibilities:

user route input

displaying route options

map visualization

🧩 Backend

Node.js

Express.js

Responsibilities:

API routing

route processing

safety scoring logic

integration with routing APIs

🗄 Database

MongoDB

Stores:

unsafe area data

user reported safety locations

safety datasets

🌍 External APIs

OpenRouteService API

Used to:

generate multiple route options

retrieve route coordinates

support map visualization

🔄 System Workflow
1️⃣ User Request

The user enters:

source location

destination

on the frontend interface.

2️⃣ Route Generation

The backend sends a request to:

OpenRouteService API

The API returns multiple possible routes.

3️⃣ Route Segmentation

Each route is divided into smaller road segments for evaluation.

4️⃣ Risk Evaluation

Each segment is analyzed using:

crime density data

reported unsafe areas

contextual risk factors

A risk score is assigned to every segment.

5️⃣ Route Risk Calculation

The total route risk is calculated by summing all segment risks.

Example conceptual formula:

Route Risk =
(w1 × crime density) +
(w2 × reported unsafe areas) +
(w3 × time factor)
6️⃣ Route Ranking

Routes are ranked based on their total risk score.

The system highlights the lowest-risk route as the recommended path.


🛠 Local Development Setup
1️⃣ Clone the repository
git clone https://github.com/kuruet/safeRoute.git
cd safeRoute
2️⃣ Install dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install
3️⃣ Environment Variables

Create a .env file.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
ORS_API_KEY=your_openrouteservice_api_key
4️⃣ Run the backend
npm run dev
5️⃣ Run the frontend
npm start
🌍 Live Demo

You can explore the project here:

Live Application

https://safe-route-snowy.vercel.app/

GitHub Repository

https://github.com/kuruet/safeRoute

🧪 Current Limitations

Safety data is currently static

No real-time crime or incident feeds

Risk scoring algorithm can be further refined

Limited scalability testing

🚀 Future Improvements

Potential upgrades include:

real-time crime data integration

safety heatmaps

machine learning based risk prediction

mobile application support

live safety alerts

advanced crowdsourced reporting

📚 Engineering Concepts Demonstrated

This project demonstrates understanding of:

geospatial route analysis

weighted scoring algorithms

REST API integration

map-based applications

crowdsourced data systems

full-stack architecture



⭐ If you found this project interesting, consider starring the repository.
