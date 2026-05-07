import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, TV_ENDPOINT, type ImageCell, type MovieResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const tvCategory = category || 'airing_today';
  const [page, setPage] = useState<number>(1);

  const { data } = useTmdb<MovieResponse>(`${TV_ENDPOINT}/${tvCategory}`, { page, tvCategory });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  const categories = [
    { key: 'airing_today', label: 'Airing Today' },
    { key: 'on_the_air', label: 'On The Air' },
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
  ];

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Trending</h1>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => navigate(`/tv/category/${c.key}`)}
              className={`rounded px-4 py-2 ${tvCategory === c.key ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}/seasons`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
