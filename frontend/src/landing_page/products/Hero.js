import React from 'react';

function Hero() {
    return (
        <div className="container mt-5 pt-5 mb-3 pb-5 border-bottom">
            <div className="row text-center mt-5 p-3" style={{color: "#3e3f42ff"}}>
                <h2 className="mb-3">TradePulse Products</h2>
                <h4 className="mb-4 text-muted" style={{color: "#4d4f50ff"}}>Sleek, modern, and intuitive trading platforms</h4>
                <p>Check out our <a href=""  style={{textDecoration:"none"}}>investment offerings →</a></p>
            </div>
        </div>
    );
}

export default Hero;