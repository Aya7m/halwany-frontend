import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import toast from 'react-hot-toast'
import Link from 'next/link'

const BestSelling = () => {

  const { fetchBestSellers, bestSellers, addToCart } = useProductStore()

  useEffect(() => {
    fetchBestSellers()
  }, [])


  console.log(bestSellers, 'bestSellers');

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId)
      toast.success("تم إضافة المنتج إلى السلة")
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة المنتج إلى السلة")
    }
  }










  return (
    <div className='w-full mt-12'>
      <h1 className='text-4xl text-center my-6'>best selling</h1>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center'>
          {bestSellers?.map((product) => (
            <div key={product._id} className='border border-gray-300 rounded-lg p-4'>
              <Link href={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-lg mb-4' />
                <h2 className='text-xl font-semibold'>{product.name}</h2>
                <p className='text-lg font-bold mt-4'>${product.price}</p>
              </Link>
              <button
                onClick={() => handleAddToCart(product._id)}
                className='bg-outline hover:border-2 text-black border-1 py-2 px-4 rounded w-full mt-2'
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BestSelling