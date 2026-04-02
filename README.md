# TradePulse 🚀  
*A Full‑Stack Trading Platform (Frontend + Dashboard + Backend)*

## 📌 Project Overview
**TradePulse** is a full‑stack trading platform inspired by modern stock‑trading applications.  
The project is structured into **three major parts**:

1. **Frontend (Public Website)** – Marketing & landing pages  
2. **Dashboard (Authenticated Area)** – Trading dashboard UI  
3. **Backend (API + Database)** – Business logic & data handling  

The goal of this project was to **understand real‑world full‑stack architecture**, clean component design, and backend‑frontend communication — not just make pages work.

---

## 🧠 Architecture (High Level)

```
TradePulse
│
├── frontend   → Public landing website (React)
├── dashboard  → Trading dashboard UI (React)
├── backend    → REST API + DB models (Node.js, Express)
```

---

## 🛠 Tech Stack

### Frontend (Landing Website)
- React.js
- CSS (custom styling)
- Font Awesome (icons)
- Component‑based architecture

### Dashboard
- React.js
- Context API (state management)
- Reusable UI components
- Charts & visualizations
- Modular folder structure

### Backend
- Node.js
- Express.js
- MongoDB (Schema‑based design)
- REST APIs

### Testing
- Jest
- React Testing Library

---

## 📂 Folder Structure Explained

### 🔹 `frontend/`
Public website visible to all users.

Key folders:
- `landing_page/` – Home, About, Pricing, Products, Support, Signup
- `media/` – Images & assets
- `tests/` – Component testing

Example:
```
frontend/src/
├── landing_page/
│   ├── home/
│   ├── about/
│   ├── pricing/
│   ├── products/
│   ├── support/
│   └── signup/
└── tests/
    └── Hero.test.js
```

---

### 🔹 `dashboard/`
User dashboard after sign‑in.

Key components:
- Holdings
- Orders
- Positions
- Watchlist
- Funds
- Charts (Doughnut, Vertical Graph)
- Buy/Sell action window

Important files:
```
dashboard/src/components/
├── Dashboard.js
├── Holdings.js
├── Orders.js
├── Positions.js
├── WatchList.js
├── Funds.js
├── DoughnoutChart.js
├── VerticalGraph.js
└── BuyActionWindow.js
```

State Management:
- `GeneralContext.js` (React Context API)

---

### 🔹 `backend/`
Handles data & business logic.

#### Models
```
backend/model/
├── HoldingsModel.js
├── OrdersModel.js
└── PositionsModel.js
```

#### Schemas
```
backend/schemas/
├── HoldingsSchema.js
├── OrdersSchema.js
└── PostionsSchema.js
```

Backend handles:
- Holdings data
- Order management
- Position tracking

---

## 🧪 Testing

Testing is implemented for frontend components using:
- **Jest**
- **React Testing Library**

Example test:
```
frontend/src/tests/Hero.test.js
```

Purpose:
- Ensure UI renders correctly
- Protect against UI regressions
- Improve maintainability

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone <repo-url>
cd TradePulse
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```

Server runs on:
```
http://localhost:3002
```

---

### 3️⃣ Frontend (Landing Page)
```bash
cd frontend
npm install
npm start
```

Runs on:
```
http://localhost:3000
```

---

### 4️⃣ Dashboard
```bash
cd dashboard
npm install
npm start
```

---

## 🔑 Key Learnings

- Real‑world full‑stack folder separation
- Component reusability in React
- Context API for global state
- Backend schema‑driven design
- Writing basic frontend tests
- Clean project structuring

---

## 📈 Future Improvements

- Authentication (JWT‑based login/signup)
- User‑specific dashboard data
- Backend validation & middleware
- More unit & integration tests
- Deployment (AWS / Vercel)

---

## 👨‍💻 Author
**Prajwal**

Project Link : https://main.dij7mn1c1xwl5.amplifyapp.com/


## Resume Poimts
- Full-Stack Trading Platform: Built a 3-tier React/Node.js architecture with Context API for real-time state management across 10+ dashboard components.
- Data Modeling & API: Designed structured MongoDB schemas and RESTful APIs to manage high-integrity tracking of user holdings, orders, and positions.
- Automated Testing: Developed a comprehensive test suite using Jest and React Testing Library to ensure UI stability and prevent regressions.
- Cloud Deployment: Deployed a high-availability frontend and dashboard using AWS Amplify, implementing automated build-and-deploy workflows via GitHub integration.
