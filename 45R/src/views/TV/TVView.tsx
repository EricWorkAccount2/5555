import { ImageGrid, ImageOverlay, Pagination } from '@/components';
import { favoriteAction, getImageUrl, TV_ENDPOINT, type ImageCell, type TVResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TVView = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const tvCategory = category || 'on_the_air';
  const [page, setPage] = useState<number>(1);

  const { data } = useTmdb<TVResponse>(`${TV_ENDPOINT}/${tvCategory}`, { page, tvCategory });
  const { favorites, toggleFavorite } = useUserContext();

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_name ?? result.name ?? 'Unknown',
    media: 'tv',
  }));

  const categories = [
    { key: 'airing_today', label: 'Airing Today' },
    { key: 'on_the_air', label: 'On The Air' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
  ];

  if (!data) return <p className="text-center text-gray-400">Something went wrong obviously.</p>;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Now Playing</h1>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => navigate(`/tv/category/${c.key}`)}
              className={`rounded px-4 py-2 text-white transition ${tvCategory === c.key ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) => navigate(`/tv/${image.id}/credits`)}
        renderOverlay={(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
