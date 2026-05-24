import { DetailItem, ImageGrid, ImageOverlay, LinkGroup, Modal } from '@/components';
import { type ImageCell, type TVResponse, cartAction, favoriteAction, getBackdropUrl, getImageUrl, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useUserContext } from '@/hooks/useUserContext';
import { useNavigate, useParams, Outlet } from 'react-router-dom';

const getPrice = (releaseDate?: string) => {
  const currentYear = new Date().getFullYear();
  const releaseYear = releaseDate ? Number(releaseDate.slice(0, 4)) : NaN;
  const yearsSince = Number.isFinite(releaseYear) && releaseYear > 4.99 ? Math.max(4.99, currentYear - releaseYear) : 4.99;
  const price = Math.max(4.99, 19.99 - yearsSince * 1.99);

  return `$${price.toFixed(2)}`;
};

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const endpoint = TV_ENDPOINT;
  const { data } = useTmdb<TVResponse>(`${endpoint}/${id}`, { append_to_response: 'videos' });
    const { cart, favorites, toggleCart, toggleFavorite } = useUserContext();
  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
    secondaryText: getPrice(result.release_date),
    media: 'movie',
  }));
  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.original_name} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.original_name} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{data.original_name}</h1>
            <p className="leading-relaxed text-gray-300">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.first_air_date} />
              <DetailItem label="Rating" value={data.vote_average} />
              <DetailItem label="Price" value={getPrice(data.first_air_date)} />
            </div>
            <LinkGroup
              options={[
                { label: 'Seasons', to: 'seasons' },
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Trailers', to: 'trailers' },
              ]}
            />
            <Outlet context={{ data }} />
          </div>
          
        </div>
      </div>
      <ImageGrid
              images={gridData}
              onClick={(image) => navigate(`/tv/${image.id}/credits`)}
              renderOverlay={(image) => (
                <ImageOverlay
                  actions={[
                    cartAction((image: ImageCell) => cart.has(image.id), toggleCart),
                    favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite),
                  ]}
                  image={image}
                />
              )}
            />
    </Modal>
  );
};
