import React from "react";

function Signup() {
    const handleDemoClick = () => {
        // replace with your deployed dashboard URL
        window.location.href = "https://main.dch6zfbwdj7go.amplifyapp.com";
    };

    return (
        <>
            <div
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <h1>Sign up for TradePulse</h1>

                <p style={{ marginTop: "10px", color: "#666" }}>
                    Want to explore first?
                </p>

                <button
                    onClick={handleDemoClick}
                    style={{
                        marginTop: "20px",
                        padding: "12px 28px",
                        backgroundColor: "#387ed1",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    View Demo Dashboard
                </button>
            </div>
        </>
    );
}

export default Signup;
