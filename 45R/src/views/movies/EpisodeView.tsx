import { Button, ImageGrid } from '@/components';
import { type EpisodeResponse, TV_ENDPOINT, getImageUrl } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const navigate = useNavigate();
  const { id, season } = useParams();
  const { data } = useTmdb<EpisodeResponse>(`${TV_ENDPOINT}/${id}/season/${season}`, {});

  const gridData = (data?.episodes ?? []).map((result) => ({
    id: result.episode_number,
    imageUrl: getImageUrl(result.still_path),
    primaryText: `Ep ${result.episode_number}: ${result.name}`,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="flex-1 space-y-3 px-2">
      <Button variant="primary" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="flex items-center gap-2 text-gray-400">{data.air_date}</p>
      <p className="text-gray-300">{data.overview}</p>
      <h2 className="text-2xl font-bold">Episodes</h2>
      {data.episodes.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No episodes available.</p>}
    </section>
  );
};
