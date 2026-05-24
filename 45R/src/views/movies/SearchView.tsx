import { ButtonGroup, ImageGrid, ImageOverlay, Pagination, SearchBar } from '@/components';
import { type ImageCell, type SearchResponse, favoriteAction, getImageUrl, RATE_LIMIT_DELAY, SEARCH_ENDPOINT } from '@/core';
import { useDebounce, useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserContext } from '@/hooks/useUserContext';


export const SearchView = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const debouncedQuery = useDebounce(query, RATE_LIMIT_DELAY);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') ?? 'movie';
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, { query: debouncedQuery, page });
    const { favorites, toggleFavorite } = useUserContext();
  

  const updateParam = (key: string, value: string) => {
    setSearchParams({ type, [key]: value });
  };

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path ?? result.profile_path ?? ''),
    primaryText: result.original_title ?? result.name ?? '',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Search</h1>
      <SearchBar value={query} onChange={setQuery} />
      <ButtonGroup
        value={type}
        options={[
          { label: 'Movies', value: 'movie' },
          { label: 'TV Shows', value: 'tv' },
          { label: 'Person', value: 'person' },
        ]}
        onClick={(value) => updateParam('type', value)}
      />
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          if (type === 'movie') {
            navigate(`/movie/${image.id}/credits`);
          } else if (type === 'tv') {
            navigate(`/tv/${image.id}/seasons`);
          } else {
            navigate(`/person/${image.id}/career`);
          }
        }}
        renderOverlay={(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
        )}
      />

      {data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found.</p>
      )}
    </section>
  );
};
