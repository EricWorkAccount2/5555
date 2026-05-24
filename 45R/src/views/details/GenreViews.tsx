import { ImageGrid, ImageOverlay, Pagination } from '@/components';
import { DISCOVER_ENDPOINT, cartAction, favoriteAction, getImageUrl, type GenreResponse, type ImageCell, type Media } from '@/core';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType: routeMediaType, genre: routeGenre } = useParams();
  const mediaType = routeMediaType || 'movie';
  const genreValue = routeGenre || 'action';

  const movieGenres = [
    { id: '28', name: 'Action', value: 'action' },
    { id: '12', name: 'Adventure', value: 'adventure' },
    { id: '16', name: 'Animation', value: 'animation' },
    { id: '35', name: 'Comedy', value: 'comedy' },
    { id: '80', name: 'Crime', value: 'crime' },
    { id: '18', name: 'Drama', value: 'drama' },
    { id: '27', name: 'Horror', value: 'horror' },
    { id: '10749', name: 'Romance', value: 'romance' },
  ];

  const tvGenres = [
    { id: '10759', name: 'Action & Adventure', value: 'action_adventure' },
    { id: '16', name: 'Animation', value: 'animation' },
    { id: '35', name: 'Comedy', value: 'comedy' },
    { id: '80', name: 'Crime', value: 'crime' },
    { id: '18', name: 'Drama', value: 'drama' },
    { id: '10762', name: 'Kids', value: 'kids' },
    { id: '9648', name: 'Mystery', value: 'mystery' },
    { id: '10765', name: 'Sci-Fi & Fantasy', value: 'sci_fi_fantasy' },
  ];

  const genres = mediaType === 'movie' ? movieGenres : tvGenres;
  const genreId = genres.find((g) => g.value === genreValue)?.id ?? genres[0].id;
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<GenreResponse>(`${DISCOVER_ENDPOINT}/${mediaType}`, { with_genres: genreId, page });
  const { cart, favorites, toggleCart, toggleFavorite } = useUserContext();

  const handleMediaTypeChange = (type: string) => {
    const firstGenre = (type === 'movie' ? movieGenres : tvGenres)[0].value;
    navigate(`/genre/${type}/${firstGenre}`);
    setPage(1);
  };

  const handleGenreChange = (value: string) => {
    navigate(`/genre/${mediaType}/${value}`);
    setPage(1);
  };

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name ?? 'Unknown',
    media: mediaType as Media,
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Browse by Genre</h1>
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleMediaTypeChange('movie')}
            className={`rounded px-4 py-2 text-white transition ${mediaType === 'movie' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
          >
            Movies
          </button>
          <button
            onClick={() => handleMediaTypeChange('tv')}
            className={`rounded px-4 py-2 text-white transition ${mediaType === 'tv' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
          >
            TV Shows
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.value)}
              className={`rounded px-4 py-2 text-white transition ${genreValue === genre.value ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'} `}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
      {data?.results && (
        <>
          <ImageGrid
            images={gridData}
            onClick={(image) => navigate(mediaType === 'movie' ? `/movie/${image.id}/credits` : `/tv/${image.id}/seasons`)}
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
        </>
      )}
    </section>
  );
};
