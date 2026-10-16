import React from "react";
import {
  DashboardDataStatus,
  useDashboardData,
} from "./DashboardDataContext";

const Summary = () => {
  const { data } = useDashboardData();
  const holdingsPage = data?.holdings;
  const holdings = holdingsPage?.items ?? [];
  const investment = holdings.reduce(
    (total, holding) =>
      total + Number(holding.avg || 0) * Number(holding.qty || 0),
    0
  );
  const currentValue = holdings.reduce(
    (total, holding) =>
      total + Number(holding.price || 0) * Number(holding.qty || 0),
    0
  );
  const profitLoss = currentValue - investment;
  const isPartial =
    (holdingsPage?.page ?? 1) > 1 || (holdingsPage?.hasNextPage ?? false);
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <>
      <DashboardDataStatus />
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>
            Holdings
            {isPartial ? ` (page ${holdingsPage?.page ?? 1})` : ""}
          </p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={profitLoss >= 0 ? "profit" : "loss"}>
              {formatAmount(profitLoss)}
            </h3>
            <p>{isPartial ? "P&L on loaded page" : "P&L"}</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatAmount(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatAmount(investment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
