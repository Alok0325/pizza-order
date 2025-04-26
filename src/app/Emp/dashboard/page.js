"use client";
import React, { useState } from 'react';

const EmployeeDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD001",
      customerName: "Aman",
      items: [
        { name: "Veg Pizza", quantity: 2 },
        { name: "Cold Drink", quantity: 1 }
      ],
      total: 747,
      status: "Pending",
      time: "10:30 AM"
    },
    {
      id: 2,
      orderNumber: "ORD002",
      customerName: "Abhishek",
      items: [
        { name: "Non-Veg Burger", quantity: 1 },
        { name: "Cold Coffee", quantity: 2 }
      ],
      total: 447,
      status: "Preparing",
      time: "11:15 AM"
    },
    {
      id: 3,
      orderNumber: "ORD003",
      customerName: "Raj",
      items: [
        { name: "Veg Pizza", quantity: 1 },
        { name: "Cold Drink", quantity: 2 }
      ],
      total: 417,
      status: "Ready",
      time: "11:45 AM"
    }
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  return (
    <>
     
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employee Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{order.orderNumber}</h3>
                  <p className="text-gray-600">{order.customerName}</p>
                  <p className="text-sm text-gray-500">Time: {order.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Pending" 
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Preparing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Order Items:</h4>
                <ul className="space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item.quantity}x {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total: ₹{order.total}</p>
                <div className="space-x-2">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "Preparing")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === "Preparing" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "Ready")}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Mark Ready
                    </button>
                  )}
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;