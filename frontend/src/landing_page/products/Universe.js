import React from 'react';

function Universe() {
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center mt-5">
                    <h1 className="mb-4 fs-4 mt-2" style={{ color: "#3e3f42ff" }}>
                        The TradePulse Universe
                    </h1>
                    <p>
                        Extend your trading and investment experience even further with our partner platforms
                    </p>
                </div>
            </div>

            <div className="row mt-5 text-center align-items-start">
                {/* Smallcase */}
                <div className="col-md-4 col-sm-12 p-3">
                    <img
                        src="media/images/smallcaseLogo.png"
                        alt="Smallcase Logo"
                        className="d-block mx-auto mb-4"
                        style={{ height: "50px", width: "auto" }}
                    />
                    <p
                        className="text-small text-muted mx-auto mt-3"
                        style={{ maxWidth: "260px", lineHeight: "1.8" }}
                    >
                        Thematic investing platform that helps you invest in diversified
                        baskets of stocks or ETFs.
                    </p>
                </div>

                {/* Streak */}
                <div className="col-md-4 col-sm-12 p-3">
                    <img
                        src="media/images/streakLogo.png"
                        alt="Streak Logo"
                        className="d-block mx-auto mb-4"
                        style={{ height: "50px", width: "auto" }}
                    />
                    <p
                        className="text-small text-muted mx-auto mt-3"
                        style={{ maxWidth: "260px", lineHeight: "1.8" }}
                    >
                        Systematic trading platform
                        that allows you to create and backtest
                        strategies without coding.
                    </p>
                </div>

                {/* Sensibull */}
                <div className="col-md-4 col-sm-12 p-3">
                    <img
                        src="media/images/sensibullLogo.svg"
                        alt="Sensibull Logo"
                        className="d-block mx-auto mb-4"
                        style={{ height: "50px", width: "auto" }}
                    />
                    <p
                        className="text-small text-muted mx-auto mt-3"
                        style={{ maxWidth: "260px", lineHeight: "1.8" }}
                    >
                        Options trading platform that lets you
                        create strategies, analyze positions, and examine
                        data points like open interest, FII/DII, and more.
                    </p>
                </div>
            </div>

            <div className="row mt-4 text-center align-items-start">
                {/* Smallcase */}
                <div className="col-md-4 col-sm-12 p-3">
                    <img
                        src="media/images/zerodhaFundhouse.png"
                        alt="Smallcase Logo"
                        className="d-block mx-auto mb-4"
                        style={{ height: "50px", width: "auto" }}
                    />
                    <p
                        className="text-small text-muted mx-auto mt-3"
                        style={{ maxWidth: "260px", lineHeight: "1.8" }}
                    >
                        Thematic investing platform that helps you invest in diversified
                        baskets of stocks or ETFs.
                    </p>
                </div>

                {/* Streak */}
                <div className="col-md-4 col-sm-12 p-3">
                    <img
                        src="media/images/goldenpiLogo.png"
                        alt="Streak Logo"
                        className="d-block mx-auto mb-4"
                        style={{ height: "50px", width: "auto" }}
                    />
                    <p
                        className="text-small text-muted mx-auto mt-3"
                        style={{ maxWidth: "260px", lineHeight: "1.8" }}
                    >
                        Systematic trading platform
                        that allows you to create and backtest
                        strategies without coding.
                    </p>
                </div>

                {/* Sensibull */}
                <div className="col-md-4 col-sm-12 p-3">
                    <img
                        src="media/images/dittoLogo.png"
                        alt="Sensibull Logo"
                        className="d-block mx-auto mb-4"
                        style={{ height: "50px", width: "auto" }}
                    />
                    <p
                        className="text-small text-muted mx-auto mt-3"
                        style={{ maxWidth: "260px", lineHeight: "1.8" }}
                    >
                        Options trading platform that lets you
                        create strategies, analyze positions, and examine
                        data points like open interest, FII/DII, and more.
                    </p>
                </div>
            </div>
            <div className='text-center mt-5 mb-4 pt-3'>
                    <button className="p-2 btn btn-primary fs-5 mb-5"  style={{width:"20%", margin: "0 auto"}}>Sign up for free</button>
            </div>
        </div>
    );
}

export default Universe;
