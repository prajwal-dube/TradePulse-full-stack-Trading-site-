import React from "react";

function Hero() {
  return (
      <section className="container-fluid pt-5" id="supportHero">
            <div className=" mt-5 pt-5 " id="supportWrapper">
                <h3>Support Portal</h3>
                <a className="me-5 pe-5"  href="" style={{ color: "white" }}>Track Tickets</a>
            </div>
            <div className="row mb-5 ">
                <div className="col-6 p-5  mb-5">
                  <h1 className="mb-5 fs-4">Search for an answer or browse help topics to create a ticket</h1>
                  <input className="mb-3" style={{width:"500px"}} placeholder="Eg. how do I activate F&O, why is my order getting rejected.."/><br/>
                  <a href="" style={{color:"white"}}>Track account opening</a><br />
                  <a href="" style={{color:"white"}}>Track segment activationIntraday marginKite user manual</a><br />
                  <a href="" style={{color:"white"}}>Intraday margins</a><br />
                  <a href="" style={{color:"white"}}>Kite user manual</a><br />
                </div>
                <div className="col-1"></div>
                <div className="col-5 p-5 mb-5 ">
                  <h3 className="mb-3 fs-4">Featured</h3>
                  <ul>
                    <li>
                        <a href="" style={{ color: "white" }}>Current Takeovers and Delisting - January 2024</a>
                    </li>
                    <li>
                        <a href="" style={{ color: "white" }}>Latest Intraday leverages - MIS & CO</a>
                    </li>
                </ul>
                </div>
            </div>
      </section>
  );
}

export default Hero;