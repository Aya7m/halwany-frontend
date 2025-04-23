"use client"
import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import LoadingSpinner from '../loadingSpinner/page'

const ProductPage = () => {

 const{getAllProducts,products,loading,addToCart} =useProductStore()

 useEffect(() => {
    getAllProducts()
  }, [])

  console.log(products);
  
  if(loading){
    return <LoadingSpinner/>
  }

  return (
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center'>

    {products?.map((product) => (
      <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
        <p className='text-center mt-4 my-3 rounded-2xl'>{product.category}</p>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-semibold my-5">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
        <button onClick={() => addToCart(product._id)} className="navbar w-full text-white px-4 py-2 rounded mt-2">Add to Cart</button>  
      </div>
    ))}

   </div>

  )
}

export default ProductPage
