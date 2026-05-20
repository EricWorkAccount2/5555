import { ICON_SIZE, type ImageAction, type ImageCell } from '@/core';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const favoriteAction = (isFavorite: (image: ImageCell) => boolean, onToggleFavorite: (image: ImageCell) => void): ImageAction => ({
  active: isFavorite,
  icon: (active) =>
    active ? <FaHeart className="text-blue-500" size={ICON_SIZE} /> : <FaRegHeart className="text-white" size={ICON_SIZE} />,
  id: 'favorite',
  onClick: onToggleFavorite,
  position: 'left',
});
