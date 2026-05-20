import { ImageGrid } from '@/components';
import { useUserContext } from '@/hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites } = useUserContext();

  const images = Array.from(favorites.values());

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Favorites</h1>

      {images.length === 0 ? (
        <p className="mt-10 text-gray-400">You have no favorites yet.</p>
      ) : (
        <ImageGrid images={images} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      )}
    </section>
  );
};
