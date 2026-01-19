import React from "react";

function Hero() {
  return (
    <div className="container mt-5 pt-3">
      {/* Header */}
      <div className="row pt-5 mt-5 mb-5 border-bottom text-center">
        <h2 style={{ color: "#393737ff" }}>Charges</h2>
        <h4 className="mt-3 mb-5 pb-5" style={{ color: "#757373ff" }}>
          List of all charges and taxes
        </h4>
      </div>

      {/* Pricing Sections */}
      <div className="row  pb-4 text-center align-items-start">
        {/* Equity Delivery */}
        <div className="col-md-4 col-sm-12 p-3">
          <img
            src="media/images/pricingEquity.svg"
            alt="Equity Delivery"
            className="d-block mx-auto mb-3"
            style={{ height: "180px", width: "auto" }}
          />
          <h4 style={{ color: "#393737ff" }}>Free equity delivery</h4>
          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "280px" }}>
            All equity delivery investments (NSE, BSE) are absolutely free — ₹0
            brokerage.
          </p>
        </div>

        {/* Intraday and F&O trades */}
        <div className="col-md-4 col-sm-12 p-3">
          <img
            src="media/images/intradayTrades.svg"
            alt="Intraday and F&O trades"
            className="d-block mx-auto mb-3"
            style={{ height: "180px", width: "auto" }}
          />
          <h4 style={{ color: "#393737ff" }}>Intraday and F&O trades</h4>
          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "280px" }}>
            Flat ₹20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        {/* Free Direct MF */}
        <div className="col-md-4 col-sm-12 p-3">
          <img
            src="media/images/pricingEquity.svg"
            alt="Free direct MF"
            className="d-block mx-auto mb-3"
            style={{ height: "180px", width: "auto" }}
          />
          <h4 style={{ color: "#393737ff" }}>Free direct MF</h4>
          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "280px" }}>
            All direct mutual fund investments are absolutely free — ₹0
            commissions and DP charges.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Hero;
