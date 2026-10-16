import React from "react";
import {
  DashboardPagination,
  DashboardDataStatus,
  useDashboardData,
} from "./DashboardDataContext";

const Positions = () => {
  const { data } = useDashboardData();
  const positionsPage = data?.positions;
  const allPositions = positionsPage?.items ?? [];

  return (
    <>
      <h3 className="title">Positions</h3>
      <DashboardDataStatus />

      <div className="order-table">
        <table>
          <thead>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          </thead>

          <tbody>
          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={stock._id || index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      <DashboardPagination collection="positions" pageData={positionsPage} />
    </>
  );
};

export default Positions;
