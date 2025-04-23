"use client"
import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import Link from 'next/link';
import LoadingSpinner from '../loadingSpinner/page';

const ChecolataPage = () => {
    const { loading, getProductbyCategory, productCategory } = useProductStore();

    useEffect(() => {
        getProductbyCategory("Chocolate");
    }, [getProductbyCategory]);
    console.log(productCategory);

    if(loading){
        return <LoadingSpinner/>
    }

    return (
        <div className='w-full h-screen'>
            <h2 className='text-2xl text-brawn-500'>Checolata</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center'>

                
                {productCategory?.map((product) => (
                    <Link key={product._id} href={`/category/Chocolate`} className="bg-white p-4 rounded-lg shadow-md block">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <h2 className="text-lg font-semibold my-5">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </Link>
                ))}



            </div >

        </div>

    )
}

export default ChecolataPage