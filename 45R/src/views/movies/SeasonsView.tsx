import { ImageGrid } from '@/components';
import { TV_ENDPOINT, getImageUrl, type SeasonsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});

  if (!data) {
  return <p className="text-center text-gray-400">Loading...</p>;
}

const seasons = data.seasons ?? [];

const gridData = seasons.map((season) => ({
  id: season.season_number,
  imageUrl: getImageUrl(season.poster_path ?? ''),
  primaryText: season.name,
  secondaryText: season.air_date,
}));

return (
  <section className="px-2">
    <h2 className="mb-6 text-2xl font-bold">Seasons</h2>

    {seasons.length > 0 ? (
      <>
        <ImageGrid
          images={gridData}
          onClick={(image) =>
            navigate(`/tv/${id}/season/${image.id}`)
          }
        />
        <Outlet />
      </>
    ) : (
      <p className="text-center text-gray-400">
        No seasons available.
      </p>
    )}
  </section>
);

};