
// app/product/[id]/page.tsx
import axios from "axios";
import AddToCartButton from "./AddToCartButton";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface PageProps  {
  params: {
    id: string;
  };
}

const ProductDetailsPage = async ({ params }: PageProps ) => {
  const response = await axios.get<Product>(
    `https://halwany-backend-production.up.railway.app/product/${params.id}`
  );

  const product = response.data;

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold text-green-600">${product.price}</p>
      <div className="flex w-full items-center justify-center">
        <AddToCartButton productId={product._id}/>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
