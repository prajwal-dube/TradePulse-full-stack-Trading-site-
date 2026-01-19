import React from 'react';

function CreateTicket() {
    return (
        <div className="container  pt-1">
            <div className="row mt-5 mb-5 text-center" style={{ color: "#393737ff" }}>
                <h2>To create a ticket, select a relevant topic</h2>
            </div>

            {/* First row */}

            <div className="row ">
                <div className="col-4">
                    <h4 className="mb-4 mt-5" style={{ color: "#3e3f42ff" }}>
                        <i className="fa fa-user-circle-o fs-5" aria-hidden="true"></i> Account Opening
                    </h4>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Online Account Opening</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Offline Account Opening</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                        Company, Partnership <br /> HUF Account Opening
                    </a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>NRI Account Opening</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Charges at TradePulse</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                        TradePulse IDFC FIRST Bank 3-in-1 Account
                    </a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Getting Started</a>
                </div>

                <div className="col-4">
                    <h4 className="mb-4 mt-5" style={{ color: "#3e3f42ff" }}>
                        <i className="fa fa-line-chart fs-5" aria-hidden="true"></i> Your TradePulse Account
                    </h4>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Login Credentials</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Account Modification and Segment Addition</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>DP ID and Bank Details</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Your Profile</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Transfer and Conversion of Shares</a>
                </div>

                <div className="col-4 mb-5">
                    <h4 className="mb-4 mt-5" style={{ color: "#3e3f42ff" }}>
                        <i className="fa fa-bar-chart fs-5" aria-hidden="true"></i> Your TradePulse Account
                    </h4>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Margin/Leverage, Product and Order Types</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Kite Web and Mobile</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Trading FAQs</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Corporate Actions</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Sentinel</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Kite API</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Pi and Other Platform</a>
                </div>
            </div>


            {/* Second  row  */}

            <div className="row mt-4 mb-3">
                <div className="col-4">
                    <h4 className="mb-4 mt-5" style={{ color: "#3e3f42ff" }}>
                        <i class="fa fa-credit-card-alt fs-5" aria-hidden="true"></i> Funds 
                    </h4>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Adding Funds</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Fund Withdrawal</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>
                        eMandates
                    </a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Adding Bank Accounts</a>
                </div>

                <div className="col-4">
                    <h4 className="mb-4 mt-5" style={{ color: "#3e3f42ff" }}>
                        <i class="fa fa-circle-o-notch fs-5" aria-hidden="true"></i> Console
                    </h4>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Reports</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Ledger</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Portfolio</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>60 Day Challenge</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>IPO</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Referral Program</a>
                </div>

                <div className="col-4 mb-5">
                    <h4 className="mb-4 mt-5" style={{ color: "#3e3f42ff" }}>
                        <i class="fa fa-circle-thin fs-5" aria-hidden="true"></i> Coin
                    </h4>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Understanding Mutual Funds</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>About Coin</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Buying and Selling throung Coin</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Starting an SIP</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Managing your Portfolio</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Coin App </a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Moving to Coin</a>
                    <a href="" className="d-block" style={{ textDecoration: "none", lineHeight: "2.5" }}>Government Securities</a>
                </div>
            </div>

        </div>
    );
}

export default CreateTicket;
