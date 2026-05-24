import { type ReviewsResponse, MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

export const ReviewsView = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isMovie = pathname.includes('/movie/');
  const endpoint = isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<ReviewsResponse>(`${endpoint}/${id}/reviews`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Reviews</h2>
      {data.results.length ? (
        data.results.slice(0, 5).map((review) => (
          <div key={review.id} className="rounded-xl bg-gray-800 p-5 shadow">
            <p className="mb-2 text-sm text-gray-400">By {review.author}</p>
            <p className="line-clamp-6 text-sm leading-relaxed text-gray-300">{review.content}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No reviews available.</p>
      )}
    </section>
  );
};
