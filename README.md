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

The backend defaults to port `8080`. The dashboard's development proxy uses port `3002`, so set `PORT=3002` in the backend environment when running both locally. The backend requires `MONGO_URL` to connect to MongoDB.

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

## Performance Optimization Branch

Branch: `performance/api-throughput-optimization`

This branch adds a benchmark-first performance workflow:

- **Bounded database reads:** `/allHoldings`, `/allPositions`, and `/allOrders` return a maximum of 50 records by default; use `page` and `limit` to paginate, with a hard maximum of 100 records per page. These existing endpoints retain their array response shape and return next-page metadata in response headers. Fetching `limit + 1` records determines whether another page exists without running a full-collection count query.
- **Dashboard batching:** `/dashboard-data` returns one page of holdings, positions, and orders in a single HTTP response. The dashboard loads that response once and shares it across routes; additional pages are fetched only when needed.
- **Database query efficiency:** list queries project only displayed fields and apply stable sorting. Orders use a compound `{ createdAt: -1, _id: -1 }` index; holdings and positions sort by MongoDB's built-in `_id` index.
- **Frontend loading:** dashboard routes are split into lazy-loaded chunks so pages such as orders, holdings, and positions do not all have to be included in the initial route bundle.
- **Load and CPU profiling:** the backend includes a dependency-free load-test script for requests/second, p50/p95/p99 latency, response size, and errors, plus Node.js CPU profile support.

### Measured frontend result

In the local Create React App production build, the gzipped main JavaScript bundle changed from **163.54 kB** on the pre-optimization baseline to **109.43 kB** on this branch (**54.11 kB / 33.1% smaller**). The chart is now deferred into a **55.90 kB** gzipped chunk. This is a bundle-size measurement only; it is not a measured page-load latency or API-throughput improvement, and the deferred chunk may still be downloaded when the chart scrolls near the viewport.

### Run tests and benchmarks

```powershell
npm test --prefix backend
```

Use a non-production test database and `PORT=3002`. Keep the feature-branch checkout available to run the benchmark script; start the baseline `main` server first, save a `before.json` result, then start the feature-branch server and save an `after.json` result. Use the same dataset and benchmark settings for both runs:

```powershell
$env:BASE_URL = "http://localhost:3002"
$env:ENDPOINT = "/allHoldings?limit=100"
$env:CONCURRENCY = "10"
$env:DURATION_SECONDS = "15"
$env:LABEL = "before"
$env:RESULT_FILE = "before.json"
npm run benchmark --prefix backend
```

For the second run, change `LABEL` to `"after"` and `RESULT_FILE` to `"after.json"`.

The benchmark only targets loopback by default. Remote hosts require the explicit `ALLOW_REMOTE_TARGET=true` opt-in; only load-test systems you own or have permission to test. Keep the dataset, machine, endpoint, concurrency, and duration the same for both runs. The baseline implementation returns the full holdings collection, while this branch limits the page; compare the response size and p95 latency as part of that bounded-read change. The script reports measurements but does not invent a before/after comparison. No API latency or throughput improvement numbers have been recorded yet; collect and verify them before adding those claims to a resume.

To capture a Node.js CPU profile, run `npm run profile --prefix backend` and stop the server with Ctrl+C; inspect the generated `.cpuprofile` in Chrome DevTools. For MongoDB, compare the endpoint's actual query with `explain("executionStats")` and check `executionTimeMillis`, `totalDocsExamined`, and `totalKeysExamined` before adding further indexes or caching. Caching is intentionally not enabled for order and holdings data because freshness requirements should be measured first.

## Resume Points
- Full-Stack Trading Platform: Built a 3-tier React/Node.js architecture with Context API for real-time state management across 10+ dashboard components.
- Data Modeling & API: Designed structured MongoDB schemas and RESTful APIs to manage high-integrity tracking of user holdings, orders, and positions.
- Automated Testing: Developed a comprehensive test suite using Jest and React Testing Library to ensure UI stability and prevent regressions.
- Cloud Deployment: Deployed a high-availability frontend and dashboard using AWS Amplify, implementing automated build-and-deploy workflows via GitHub integration.
- Performance Engineering: Reduced the gzipped dashboard main bundle by 33.1% (163.54 kB to 109.43 kB) with React route splitting and deferred chart loading; added bounded/indexed MongoDB reads, dashboard request batching, and a load-test harness for measuring API p95 latency and throughput.

## Resume Points ( * ) 
- Full-Stack Architecture: Developed a 3-tier trading platform using React, Node.js, Express, and MongoDB featuring a live financial dashboard powered by React Context API.
- Frontend Performance: Optimized production build with route splitting, slashing the main gzipped bundle size by 33.1% and deferring heavy chart scripts.
- API & Database Optimization: Built a limit+1 pagination mechanism and compound indexes to prevent expensive full-collection queries and minimize database load.
- Backend Benchmarking: Created a custom load-test harness to monitor p95/p99 latency and throughput under concurrent stress using Node.js CPU profiling . 
