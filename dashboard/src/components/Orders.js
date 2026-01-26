import React from "react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

// https://baseline-tcp-much-nor.trycloudflare.com
// Backend ( Railway ) : https://api.puls3.tech

  useEffect(() => {
    axios.get("https://api.puls3.tech/allOrders").then((res) => {
      // console.log(res.data);
      setAllOrders(res.data);
    });
  }, []);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      {allOrders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>You haven't placed any orders today</p>

            <Link to={"/"} className="btn">
              Get started
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Total</th>
                <th>Mode</th>
              </tr>
            </thead>

            <tbody>
              {allOrders.map((order, index) => {
                // defensive defaults in case fields are missing
                const qty = Number(order.qty || 0);
                const price = Number(order.price || 0);
                const total = qty * price;

                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{qty}</td>
                    <td>{price.toFixed ? price.toFixed(2) : price}</td>
                    <td>{total.toFixed ? total.toFixed(2) : total}</td>
                    <td>{order.mode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
