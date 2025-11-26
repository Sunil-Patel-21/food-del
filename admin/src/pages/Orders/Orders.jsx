import React from "react";
import "./Orders.css";

function Orders() {
  const staticOrders = [
    {
      id: 1,
      customer: "Shubham Patel",
      items: "Veg Pizza, Cold Coffee",
      total: "₹18.50",
      status: "Preparing",
      time: "2025-08-05 11:34 AM"
    },
    {
      id: 2,
      customer: "Ravi Kumar",
      items: "Paneer Biryani, Coke",
      total: "₹12.00",
      status: "Delivered",
      time: "2025-08-05 10:10 AM"
    },
    {
      id: 3,
      customer: "Ayesha Khan",
      items: "Masala Dosa, Filter Coffee",
      total: "₹9.75",
      status: "Pending",
      time: "2025-08-04 06:45 PM"
    }
  ];

  return (
    <div className="admin-orders">
      <h2>Recent Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {staticOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.items}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
