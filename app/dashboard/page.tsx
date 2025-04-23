"use client";

import { PlusCircle, ShoppingBasket } from 'lucide-react';
import React, { useState } from 'react'
import { motion } from 'framer-motion';

import CreateProductForm from '../components/CreateProductForm';
import ProductsList from '../components/ProductsList';

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },

];

const Page = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative z-10 container mx-auto px-4 py-24 my-24'>

        <motion.h1
          className='text-4xl font-bold mb-8 text-gray-900 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>


        <div className='flex justify-center mb-8 my-24'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${activeTab === tab.id
                ? "navbar text-white"
                : "tests text-gray-900 hover:bg-gray-300"
                }`}
            >
              <tab.icon className='mr-2 h-5 w-5' />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}

      </div>
    </div>
  )
}

export default Page