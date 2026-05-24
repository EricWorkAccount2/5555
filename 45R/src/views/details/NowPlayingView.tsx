import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, NOW_PLAYING_ENDPOINT, type ImageCell, type MovieResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NowPlayingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<MovieResponse>(NOW_PLAYING_ENDPOINT, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  const gridOptions = [
    { key: 'now_playing', label: 'Now Playing' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
  ];

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Now Playing</h1>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex gap-2">
          {gridOptions.map((c) => (
            <button
              key={c.key}
              onClick={() => navigate(`/movie/category/${c.key}`)}
              className={`rounded px-4 py-2 ${c.key === 'now_playing' ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
