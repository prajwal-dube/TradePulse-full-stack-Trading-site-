import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg border-bottom fixed-top" style={{ height: "68px", backgroundColor:"#fff"}}>
        <div className="container p-2">
          <Link className="navbar-brand" to="/">
             <img src="media/images/mylogo.png" className="mx-5 ps-5" style={{width:"53%" , height:"67px"} } alt="Logo"  />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            

            <form className="d-flex" role="search">
                <ul className="navbar-nav mb-lg-0">

                
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Signup">
                  SignUp
                </Link>
              </li>

              <li className="nav-item " >
                <Link className="nav-link active" to="/About">
                  About
                </Link>
              </li>

              <li className="nav-item ">
                <Link className="nav-link active" to="/Product">
                  Products
                </Link>
              </li>

              <li className="nav-item ">
                <Link className="nav-link active" to="/Pricing">
                  Pricing
                </Link>
              </li>

              <li className="nav-item ">
                <Link className="nav-link active" to="/Support">
                  Support
                </Link>
              </li>

                
              
            </ul>
            </form>
          </div>
        </div>
      </nav>

  );
}

export default Navbar;
