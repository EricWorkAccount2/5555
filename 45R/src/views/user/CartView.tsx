import { ImageGrid, ImageOverlay } from '@/components';
import { cartAction, type ImageCell } from '@/core';
import { useUserContext } from '@/hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

// Figured out I can just duplicate the FavoritesView and add it to every other view. plus I just made a cartActions bluh bluhbla.
export const CartView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Cart</h1>
      {cart.size === 0 ? (
        <p className="mt-10 text-gray-400">You have nothing in your cart.</p>
      ) : (
        <ImageGrid
          images={Array.from(cart.values())}
          onClick={(image) => navigate(`/movie/${image.id}/credits`)}
          renderOverlay={(image) => (
            <ImageOverlay actions={[cartAction((image: ImageCell) => cart.has(image.id), toggleCart)]} image={image} />
          )}
        />
      )}
    </section>
  );
};
