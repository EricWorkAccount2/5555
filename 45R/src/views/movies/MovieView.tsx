import { ImageGrid, ImageOverlay, Pagination } from '@/components';
import { cartAction, favoriteAction, getImageUrl, MOVIE_ENDPOINT, type ImageCell, type MovieResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const movieCategory = category || 'now_playing';
  const [page, setPage] = useState<number>(1);

  const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${movieCategory}`, { page, movieCategory });
  const { cart, favorites, toggleCart, toggleFavorite } = useUserContext();

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  const categories = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
  ];

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Now Playing</h1>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => navigate(`/movies/category/${c.key}`)}
              className={`rounded px-4 py-2 ${movieCategory === c.key ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/movie/${image.id}/credits`)}
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
