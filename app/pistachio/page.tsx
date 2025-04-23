"use client"
import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import Link from 'next/link';

const PistachioPage = () => {
    const { loading, getProductbyCategory, productCategory } = useProductStore();

    useEffect(() => {
        getProductbyCategory("𝐏𝐢𝐬𝐭𝐚𝐜𝐡𝐢𝐨𝐬");
    }, [getProductbyCategory]);
    console.log(productCategory);

    return (
        <div className='w-full my-5'>
            <h2 className='text-2xl text-green-500'>𝐌𝐚𝐝𝐞 𝐖𝐢𝐭𝐡 𝐏𝐢𝐬𝐭𝐚𝐜𝐡𝐢𝐨𝐬</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center'>

                
                {productCategory?.map((product) => (
                    <Link key={product._id} href={`/product/${product._id}`} className="bg-white p-4 rounded-lg shadow-md block">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <h2 className="text-lg font-semibold my-5">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </Link>
                ))}



            </div >

        </div>

    )
}

export default PistachioPage