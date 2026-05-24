import { DetailItem, LinkGroup, Modal } from '@/components';
import { type TVResponse, getBackdropUrl, getImageUrl, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { FaShoppingCart } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const endpoint = TV_ENDPOINT;
  const { data } = useTmdb<TVResponse>(`${endpoint}/${id}`, { append_to_response: 'videos' });

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
            </div>
            <LinkGroup
              options={[
                { label: 'Seasons', to: 'seasons' },
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Trailers', to: 'trailers' },
                { label: 'Buy', to: 'buy', icon: <FaShoppingCart /> },
              ]}
            />
            <Outlet context={{ data }} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
