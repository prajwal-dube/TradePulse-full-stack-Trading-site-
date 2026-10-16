import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardPagination,
  DashboardDataStatus,
  useDashboardData,
} from "./DashboardDataContext";

const Orders = () => {
  const { data } = useDashboardData();
  const ordersPage = data?.orders;
  const allOrders = ordersPage?.items ?? [];

  return (
    <>
      <h3 className="title">Orders</h3>
      <DashboardDataStatus />

      {data && allOrders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>You haven't placed any orders today</p>
            <Link to="/" className="btn">
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
                const qty = Number(order.qty || 0);
                const price = Number(order.price || 0);

                return (
                  <tr key={order._id || index}>
                    <td>{order.name}</td>
                    <td>{qty}</td>
                    <td>{price.toFixed(2)}</td>
                    <td>{(qty * price).toFixed(2)}</td>
                    <td>{order.mode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <DashboardPagination collection="orders" pageData={ordersPage} />
    </>
  );
};

export default Orders;
