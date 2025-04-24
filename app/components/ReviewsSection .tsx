import { useEffect, useState } from "react";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewsSection = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/review/get/${productId}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("❌ Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>جارٍ تحميل التعليقات...</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">آراء العملاء:</h3>
      {reviews.length === 0 ? (
        <p>لا توجد تعليقات بعد</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded shadow">
              <div className="flex justify-between">
                <p className="font-semibold">{review.name}</p>
                <p className="text-yellow-500">{review.rating} ⭐</p>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString("ar-EG")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
