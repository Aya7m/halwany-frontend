"use client"
import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import Link from 'next/link'
import LoadingSpinner from '../loadingSpinner/page'

const RecomendedPage = () => {
    const { recommendesProducts, products,addToCart,loading } = useProductStore()

    useEffect(() => {
        recommendesProducts()
    }, [])

    console.log(products);


    if(loading){
        return <LoadingSpinner/>
    }

    return (
        <div className='max-w-5xl mx-auto my-5'>
            <h2 className='text-2xl text-center my-3'>Recommended Product</h2>
            <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6'>
                {products?.map((product) => (
                    <div key={product._id} className='border border-gray-300 rounded-lg p-4'>
                        <Link href={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-lg mb-4' />
                            <h2 className='text-xl font-semibold'>{product.name}</h2>
                            <p className='text-lg font-bold mt-4'>${product.price}</p>
                        </Link>
                        <button
                            onClick={() => addToCart(product._id)}
                            className='bg-outline hover:border-2 text-black border-1 py-2 px-4 rounded w-full mt-2'
                        >
                            Add to cart
                        </button>
                    </div>
                ))}


            </div>

        </div>
    )
}

export default RecomendedPage