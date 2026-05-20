import { ImageGrid, ImageOverlay, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type MovieResponse, TRENDING_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { cartAction, favoriteAction } from '@/core';
import { useUserContext } from '@/hooks/useUserContext';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const interval = searchParams.get('interval') || 'day';
  const movieType = category === 'movies' ? 'movie' : 'tv';
  const { data } = useTmdb<MovieResponse>(`${TRENDING_ENDPOINT}/${movieType}/${interval}`, { movieType, interval, page });
  const { cart, favorites, toggleCart, toggleFavorite } = useUserContext();

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name ?? result.original_name ?? 'Unknown',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Trending</h1>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/trending/movies')}
              className={`rounded px-4 py-2 text-white transition ${category === 'movies' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              Movies
            </button>
            <button
              onClick={() => navigate('/trending/tv')}
              className={`rounded px-4 py-2 text-white transition ${category === 'tv' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              TV
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSearchParams({ interval: 'day' })}
              className={`rounded px-4 py-2 text-white transition ${interval === 'day' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              Today
            </button>
            <button
              onClick={() => setSearchParams({ interval: 'week' })}
              className={`rounded px-4 py-2 text-white transition ${interval === 'week' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(movieType === 'movie' ? `/movie/${image.id}/credits` : `/tv/${image.id}/seasons`)}
        renderOverlay={(image) => (
          <ImageOverlay
            actions={[
              favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite),
              cartAction((image: ImageCell) => cart.has(image.id), toggleCart),
            ]}
            image={image}
          />
        )}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
