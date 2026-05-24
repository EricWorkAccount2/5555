import { ICON_SIZE, type ImageAction, type ImageCell } from '@/core';
import { FaShoppingCart } from 'react-icons/fa';

export const cartAction = (isInCart: (image: ImageCell) => boolean, onToggleCart: (image: ImageCell) => void): ImageAction => ({
  active: isInCart,
  icon: (active) =>
    active ? <FaShoppingCart className="text-blue-500" size={ICON_SIZE} /> : <FaShoppingCart className="text-white" size={ICON_SIZE} />,
  id: "cart",
  onClick: onToggleCart,
  position: "right"
});