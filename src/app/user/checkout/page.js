"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Checkout = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus("processing");

  
    setTimeout(() => {
     
      
      setPaymentStatus(isSuccess ? "success" : "failed");
      
      if (isSuccess) {

        setTimeout(() => {
          router.push("/user/dashboard");
        }, 2000);
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <h2>Payment Amount: ₹{window.localStorage.getItem('totalAmount')}</h2>

      {paymentStatus === "success" ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Payment Successful!</strong>
          <p>Thank you for your order. You will be redirected shortly...</p>
        </div>
      ) : paymentStatus === "failed" ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Payment Failed!</strong>
          <p>Please try again or use a different payment method.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={paymentStatus === "processing"}
                className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                  paymentStatus === "processing"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
