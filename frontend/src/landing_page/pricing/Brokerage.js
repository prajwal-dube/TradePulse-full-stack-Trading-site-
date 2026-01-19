import React from "react";

function Borokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mt-5 text-center border-top">
        <div className="col-8 p-4">
          <a href="" style={{ textDecoration: "none", color: "#387ed1" }}>
            <h3 className="fs-5 mb-5">Brokerage Calculator</h3>
          </a>
          <ul
            className="text-muted text-left"
            style={{
              listStyleType: "none",
              lineHeight: "2.2",
              fontSize: "15px",
              textAlign: "left",

            }}
          >
            <li>• Equity Delivery: No brokerage</li>
            <li>• Equity Intraday: 0.03% or ₹20 (whichever is lower) per executed order</li>
            <li>• Equity Futures: 0.03% or ₹20 (whichever is lower) per executed order</li>
            <li>• Equity Options: ₹20 per executed order</li>
            <li>• Currency Futures: ₹20 or 0.03% (whichever is lower) per executed order</li>
            <li>• Currency Options: ₹20 per executed order</li>
            <li>• Commodity Futures: ₹20 or 0.03% (whichever is lower) per executed order</li>
          </ul>
        </div>
        <div className="col-4 p-4">
          <a href="" style={{ textDecoration: "none", color: "#387ed1" }}>
            <h3 className="fs-5">List of Charges</h3>
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default Borokerage;
