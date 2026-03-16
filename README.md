# safeRoute


## 📝 Description

safeRoute is an intuitive web application developed with Express.js, focused on enhancing personal safety during travel. By leveraging intelligent pathfinding and data-driven insights, it empowers users to find the most secure routes to their destinations, ensuring peace of mind for pedestrians and commuters alike.

## ✨ Features

- 🕸️ Web


## 🛠️ Tech Stack

- 🚀 Express.js


## 📦 Key Dependencies

```
@mapbox/polyline: ^1.2.1
axios: ^1.13.6
cors: ^2.8.6
dotenv: ^17.3.1
express: ^5.2.1
mongoose: ^9.2.4
morgan: ^1.10.1
```

## 🚀 Run Commands

- **start**: `npm run start`
- **dev**: `npm run dev`


## 📁 Project Structure

```
.
├── backend
│   ├── Dockerfile
│   ├── nixpacks.toml
│   ├── package.json
│   ├── railway.json
│   ├── scripts
│   │   └── seedReports.js
│   └── src
│       ├── config
│       │   └── db.js
│       ├── controllers
│       │   ├── reportController.js
│       │   └── routeController.js
│       ├── models
│       │   └── report.js
│       ├── routes
│       │   ├── health.routes.js
│       │   ├── reportRoutes.js
│       │   └── routeRoutes.js
│       ├── server.js
│       ├── services
│       │   ├── riskEngine.js
│       │   └── routingService.js
│       └── utils
│           └── timeWeight.js
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── HeroSearch.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── MapSection.jsx
    │   │   ├── MapView.jsx
    │   │   ├── RecommendedRouteCard.jsx
    │   │   ├── ReportModal.jsx
    │   │   ├── RouteCard.jsx
    │   │   ├── RoutesSection.jsx
    │   │   ├── SafetyWarningBanner.jsx
    │   │   └── report
    │   │       ├── ReportMap.jsx
    │   │       └── ReportStepperForm.jsx
    │   ├── config
    │   │   └── api.js
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── HomePage.jsx
    │   │   └── ReportPage.jsx
    │   └── services
    │       ├── api.js
    │       └── routeService.js
    └── vite.config.js
```

## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/kuruet/safeRoute.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

## 📜 License

This project is licensed under the ISC License.

