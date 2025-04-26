"use client";
import React, { useState } from 'react';

const OrderStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders] = useState([
    {
      id: 1,
      orderNumber: "ORD001",
      status: "Delivered",
      date: "2024-03-15",
      items: ["Veg Pizza", "Cold Drink"],
      total: 358
    },
    {
      id: 2,
      orderNumber: "ORD002",
      status: "Processing",
      date: "2024-03-16",
      items: ["Non-Veg Burger", "Cold Coffee"],
      total: 348
    }
  ]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-gray-200"
      >
        <span>Order Status</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Items: {order.items.join(", ")}</p>
                    <p className="font-medium mt-1">Total: ₹{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus; 