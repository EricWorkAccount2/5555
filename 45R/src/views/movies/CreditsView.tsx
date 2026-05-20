import { ImageGrid } from '@/components';
import { getImageUrl, MOVIE_ENDPOINT, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <p className="text-center text-gray-400">Invalid movie id</p>;
  }

  const { data } = useTmdb<CreditsResponse>(
    `${MOVIE_ENDPOINT}/${id}/credits`,
    {}
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const cast = data.cast ?? [];

  const gridData = cast.map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path ?? ''),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Credits</h2>

      {cast.length > 0 ? (
        <ImageGrid
          images={gridData}
          onClick={(image) =>
            navigate(`/person/${image.id}/career`)
          }
        />
      ) : (
        <p className="text-center text-gray-400">
          No credits available.
        </p>
      )}
    </section>
  );
};