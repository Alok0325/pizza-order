"use client";
import React, { useEffect, useState } from "react";
import Header from "@/Component/Header/Header";

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: "Veg Pizza",
      price: 299,
      category: "v_pizza",
      available: true,
      quantity: 1
    },
    {
      id: 2, 
      name: "Non-Veg Pizza",
      price: 399,
      category: "nv_pizza",
      available: true,
      quantity: 1
    },
    {
      id: 3,
      name: "Veg Burger",
      price: 149,
      category: "burger", 
      available: true,
      quantity: 1
    },
    {
      id: 4,
      name: "Sandwich",
      price: 149,
      category: "sandwich", 
      available: true,
      quantity: 1
    },
     
    {
      id: 5,
      name: "Cold-Drink",
      price: 59,
      category: "drinks",
      available: true,
      quantity: 1
    }
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const updateQuantity = (id, change) => {
    setFoodItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };


  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item }]);
    }
    
    setFoodItems(items =>
      items.map(foodItem =>
        foodItem.id === item.id
          ? { ...foodItem, quantity: 1 }
          : foodItem
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const getTotalAmount = () => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    window.localStorage.setItem('totalAmount', total);
    return total;
  };
   

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await fetch('/api/check-availability');
        if (!res.ok) {
          throw new Error(`Error in fetch`);
        }
        const data = await res.json();
        for (let i=0;i<data.data.length;i++){
          data.data[i]['quantity'] = 1;
        }
        console.log(data.data)
        setFoodItems(data.data);
      } catch (e) {
        console.log("Error"+e);
      }
    };

    fetchData();
  },[]);

  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Food Order Dashboard</h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Cart ({cart.length})
        </button>
      </div>

      {showCart && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-bold">Total: ₹{getTotalAmount()}</p>
                <button 
                  onClick={() => window.location.href = '/user/checkout'}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="h-48 bg-gray-200 rounded-md mb-4">
             
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">₹{item.price}</p>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-sm ${
                item.category === "veg" 
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {item.category === "veg" ? "Veg" : "Non-Veg"}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                item.available
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {item.available ? "Available" : "Not Available"}
              </span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={!item.available || item.quantity <= 1}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={!item.available}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
            <button
              onClick={() => addToCart(item)}
              disabled={!item.available}
              className={`w-full mt-4 py-2 px-4 rounded-md ${
                item.available
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {item.available ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dashboard;
