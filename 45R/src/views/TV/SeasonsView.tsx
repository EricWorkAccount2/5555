import { ImageGrid, ImageOverlay } from '@/components';
import { TV_ENDPOINT, cartAction, getImageUrl, type ImageCell, type SeasonsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const getPrice = (releaseDate?: string) => {
  const currentYear = new Date().getFullYear();
  const releaseYear = releaseDate ? Number(releaseDate.slice(0, 4)) : NaN;
  const yearsSince = Number.isFinite(releaseYear) ? Math.max(0, currentYear - releaseYear) : 0;
  const price = Math.max(0, 19.99 - yearsSince * 1.99);
  return `$${price.toFixed(2)}`;
};

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart, toggleCart } = useUserContext();

  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const seasons = data.seasons ?? [];

  const gridData = seasons.map((season) => ({
    id: season.season_number,
    imageUrl: getImageUrl(season.poster_path ?? ''),
    primaryText: season.name,
    secondaryText: `${season.air_date} · ${getPrice(season.air_date)}`,
  }));

  return (
    <section className="px-2">
      <h2 className="mb-6 text-2xl font-bold">Seasons</h2>

      {seasons.length > 0 ? (
        <>
          <ImageGrid
            images={gridData}
            onClick={(image) => navigate(`/tv/${image.id}/credits`)}
            renderOverlay={(image) => (
              <ImageOverlay
                actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart)]}
                image={image}
              />
            )}
          />
          <Outlet />
        </>
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
