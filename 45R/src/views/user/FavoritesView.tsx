import { ImageGrid, ImageOverlay, Pagination } from '@/components';
import { favoriteAction, type ImageCell } from '@/core';
import { useUserContext } from '@/hooks/useUserContext';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'movies';
  const mediaType = category === 'tv' ? 'tv' : 'movie';
  const favoritesList = Array.from(favorites.values());
  const hasMediaTag = favoritesList.some((image) => typeof image.media !== 'undefined');
  const filteredFavorites = hasMediaTag ? favoritesList.filter((image) => image.media === mediaType) : favoritesList;
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 12;
  const totalPages = Math.max(Math.ceil(filteredFavorites.length / PAGE_SIZE), 1);
  const visibleFavorites = filteredFavorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Favorites</h1>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSearchParams({ category: 'movies' })}
              className={`rounded px-4 py-2 text-white transition ${category === 'movies' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              Movies
            </button>
            <button
              onClick={() => setSearchParams({ category: 'tv' })}
              className={`rounded px-4 py-2 text-white transition ${category === 'tv' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              TV
            </button>
          </div>
        </div>
      </div>
      {filteredFavorites.length === 0 ? (
        <p className="mt-10 text-gray-400">
          {favoritesList.length === 0
            ? 'You have no favorites yet.'
            : `You have no favorited ${mediaType === 'movie' ? 'movies' : 'TV shows'} yet.`}
        </p>
      ) : (
        <>
          <ImageGrid
            images={visibleFavorites}
            onClick={(image) => navigate(image.media === 'tv' ? `/tv/${image.id}/seasons` : `/movie/${image.id}/credits`)}
            renderOverlay={(image) => (
              <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
            )}
          />
          <Pagination page={page} maxPages={totalPages} onClick={setPage} />
        </>
      )}
    </section>
  );
};
