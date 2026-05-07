import { ImageGrid } from '@/components';
import { getImageUrl, PERSON_ENDPOINT, type ImageCell, type ImagesResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<ImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = (data.profiles ?? []).map((image, index) => ({
    id: index,
    imageUrl: getImageUrl(image.file_path),
    primaryText: '',
  }));

  return (
    <section className="mx-auto max-w-7xl space-y-8 p-5">
      <h1 className="text-3xl font-bold">Images</h1>
      {gridData.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No images available.</p>}
    </section>
  );
};
