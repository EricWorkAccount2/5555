import { ImageGrid } from '@/components';
import { getImageUrl, MOVIE_ENDPOINT, TV_ENDPOINT, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const MovieRoute = pathname.startsWith('/movie');
  const endpoint = MovieRoute ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<CreditsResponse>(`${endpoint}/${id}/credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path ?? ''),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="mb-6 text-2xl font-bold">Credits</h2>
      {data.cast.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/person/${image.id}/career`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
