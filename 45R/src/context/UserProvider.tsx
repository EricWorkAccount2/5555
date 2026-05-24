import { type ImageCell } from '@/core';
import { CART_KEY, FAVORITES_KEY, USERNAME_KEY } from '@/core/constants/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ReactNode } from 'react';
import { UserContext } from './UserContext';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, 'User');
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });

  const toggleFavorite = (image: ImageCell) => {
    const next = new Map(favorites);

    if (next.has(image.id)) {
      next.delete(image.id);
    } else {
      next.set(image.id, image);
    }

    setFavorites(next);

    if (next.has(image.id)) {
      setCart((prev) => {
        const nextCart = new Map(prev);
        nextCart.delete(image.id);
        return nextCart;
      });
    }
  };

  const toggleCart = (image: ImageCell) => {
    const next = new Map(cart);

    if (next.has(image.id)) {
      next.delete(image.id);
    } else {
      next.set(image.id, image);
    }

    setCart(next);

    if (next.has(image.id)) {
      setFavorites((prev) => {
        const nextFavorites = new Map(prev);
        nextFavorites.delete(image.id);
        return nextFavorites;
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        favorites,
        setUserName,
        toggleCart,
        toggleFavorite,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
