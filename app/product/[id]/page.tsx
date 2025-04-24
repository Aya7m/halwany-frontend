// import axios from "axios";
// import AddToCartButton from "./AddToCartButton";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
// }

// interface Params {
//   params: {
//     id: string;
//   };
// }

// const ProductDetailsPage = async ({ params }: Params) => {
//   try {
//     const response = await axios.get<Product>(
//       `https://halwany-backend-production.up.railway.app/product/${params.id}`
//     );
//     const product = response.data;

//     return (
//       <div className="max-w-2xl mx-auto mt-12">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={500}
//           height={300}
//           className="w-full h-80 object-cover rounded-lg mb-4"
//         />
//         <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//         <p className="text-lg text-gray-700 mb-4">{product.description}</p>
//         <p className="text-2xl font-semibold text-green-600">${product.price}</p>
//         <div className="flex w-full items-center justify-center">
//           <AddToCartButton productId={product._id} />
//         </div>
//       </div>
//     );
//   } catch (error) {
//     notFound();
//   }
// };

// export default ProductDetailsPage;



// app/product/[id]/page.tsx
import axios from "axios";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// هذه الدالة بتقوم بتحميل البيانات الخاصة بالـ params
export async function generateMetadata({ params }: { params: { id: string } }) {
  const response = await axios.get<Product>(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${params.id}`
  );
  const product = response.data;

  return {
    title: product.name,
    description: product.description,
  };
}

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await axios.get<Product>(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${params.id}`
    );
    const product = response.data;

    return (
      <div className="max-w-2xl mx-auto mt-12">
        <img
          src={product.image}
          alt={product.name}
          width={500}
          height={300}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600">${product.price}</p>
        <div className="flex w-full items-center justify-center">
          <AddToCartButton productId={product._id} />
        </div>
      </div>
    );
  } catch (error) {
    notFound(); // في حال كان هناك خطأ في جلب البيانات
  }
};

export default ProductDetailsPage;
