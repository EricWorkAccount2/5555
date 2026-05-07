import { Button, LinkGroup } from '@/components';
import { getImageUrl, PERSON_ENDPOINT, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 p-5">
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-3">
          <img className="w-40 rounded-xl object-cover" src={getImageUrl(data.profile_path)} alt={data.name} />
          <Button variant="primary" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-sm text-gray-400">{data.birthday}</p>
          <p className="leading-relaxed text-gray-300">{data.biography}</p>
        </div>
      </div>
      <div className="space-y-4">
        <LinkGroup
          options={[
            { label: 'Career', to: 'career' },
            { label: 'Images', to: 'images' },
          ]}
        />
        <Outlet />
      </div>
    </section>
  );
};
