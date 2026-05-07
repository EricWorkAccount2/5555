import { type MovieResponse, MOVIE_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${id}`, { append_to_response: 'videos' });

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="flex-1 gap-8 space-y-4">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">Trailer</h1>
        {trailerVideo && (
          <div className="aspect-video">
            <iframe
              className="h-full w-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              title="Movie Trailer"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
};
