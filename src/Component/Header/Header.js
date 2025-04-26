"use client";
import React from 'react';
import Link from 'next/link';
import OrderStatus from '../OrderStatus/OrderStatus';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Food Order
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/user/dashboard" className="hover:text-gray-200">
              Menu
            </Link>
            <OrderStatus />
            <Link href="/user/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;