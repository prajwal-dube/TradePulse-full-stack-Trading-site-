import React from "react";
import { VerticalGraph } from "./VerticalGraph";
import {
  DashboardPagination,
  DashboardDataStatus,
  useDashboardData,
} from "./DashboardDataContext";

// import { holdings } from "../data/data";

// Backend Link : tradepulse-backend-env.eba-qk2njbrz.ap-south-1.elasticbeanstalk.com
// https://baseline-tcp-much-nor.trycloudflare.com
// Backend ( Railway ) : https://api.puls3.tech



const Holdings = () => {
  const { data: dashboardData } = useDashboardData();
  const holdingsPage = dashboardData?.holdings;
  const allHoldings = holdingsPage?.items ?? [];
  const investment = allHoldings.reduce(
    (total, holding) => total + holding.avg * holding.qty,
    0
  );
  const currentValue = allHoldings.reduce(
    (total, holding) => total + holding.price * holding.qty,
    0
  );
  const profitLoss = currentValue - investment;
  const profitLossPercentage = investment
    ? (profitLoss / investment) * 100
    : 0;
  const isPartial =
    (holdingsPage?.page ?? 1) > 1 || (holdingsPage?.hasNextPage ?? false);
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // Adding Data to Holding Graph
  const labels = allHoldings.map((subArray) => subArray["name"]); 

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // export const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Dataset 1',
  //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       },
  //       {
  //         label: 'Dataset 2',
  //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       },
  //     ],
  //   };




  return (
    <>
      <h3 className="title">Holdings</h3>
      <DashboardDataStatus />

      <div className="order-table">
        <table>
          <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          </thead>

          <tbody>
          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={stock._id || index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>   
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      <DashboardPagination collection="holdings" pageData={holdingsPage} />
      

      <div className="row">
        <div className="col">
          <h5>{formatAmount(investment)}</h5>
          <p>{isPartial ? "Investment (loaded page)" : "Total investment"}</p>
        </div>
        <div className="col">
          <h5>{formatAmount(currentValue)}</h5>
          <p>{isPartial ? "Current value (loaded page)" : "Current value"}</p>
        </div>
        <div className="col">
          <h5>
            {formatAmount(profitLoss)} ({profitLossPercentage.toFixed(2)}%)
          </h5>
          <p>{isPartial ? "P&L (loaded page)" : "P&L"}</p>
        </div>
      </div>
      <VerticalGraph data={chartData} />
    </>
  );
};

export default Holdings;
