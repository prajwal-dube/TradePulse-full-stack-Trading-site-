import React from "react";
import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import WatchList from "./WatchList";  // From here we are getting Data . 
import { GeneralContextProvider } from "./GeneralContext";
import { DashboardDataProvider } from "./DashboardDataContext";

const Apps = lazy(() => import("./Apps"));
const Funds = lazy(() => import("./Funds"));
const Holdings = lazy(() => import("./Holdings"));
const Orders = lazy(() => import("./Orders"));
const Positions = lazy(() => import("./Positions"));
const Summary = lazy(() => import("./Summary"));

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardDataProvider>
        <GeneralContextProvider>
          <WatchList />
        </GeneralContextProvider>
        <div className="content">
          <Suspense fallback={<p role="status">Loading dashboard page...</p>}>
            <Routes>
              <Route exact path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
            </Routes>
          </Suspense>
        </div>
      </DashboardDataProvider>
    </div>
  );
};

export default Dashboard;
