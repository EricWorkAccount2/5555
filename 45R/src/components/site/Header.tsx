import { Link } from '@/components';
import { ICON_SIZE } from '@/core';
import { useUserContext } from '@/hooks/useUserContext';
import { FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const { cart, userName, favorites } = useUserContext();

  return (
    <header className="bg-gray-800">
      <nav className="flex items-center gap-6 overflow-x-auto p-4 whitespace-nowrap">
        <h1 className="shrink-0 text-2xl font-bold text-white">TMDB Explorer</h1>
        <h2 className="shrink-0 text-2xl font-bold text-white">Welcome {userName}!</h2>

        <div className="flex items-center gap-4">
          <Link match={['/movies/category/:category']} to="/movies/category/now_playing">
            Movies
          </Link>
          <Link match={['/tv/category/:category']} to="/tv/category/airing_today">
            TV
          </Link>
          <Link match={['/trending/:category']} to="/trending/movies">
            Trending
          </Link>
          <Link match={['/genre/:mediaType/:genre']} to="/genre/movie/action">
            Genre
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link match={['/search']} to="/search">
            Search
          </Link>

          <span className="text-xl text-gray-300">{userName}</span>

          <NavLink to="/favorites" className="relative inline-flex text-gray-300 transition hover:text-white">
            <FaRegHeart size={ICON_SIZE} />
            {favorites.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {favorites.size}
              </span>
            )}
          </NavLink>
          <NavLink to="/cart" className="relative inline-flex text-gray-300 transition hover:text-white">
            <FaShoppingCart size={ICON_SIZE} />
            {cart.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {cart.size}
              </span>
            )}
          </NavLink>

          <NavLink to="/settings" className="relative inline-flex text-gray-300 transition hover:text-white">
            <GoGear size={ICON_SIZE} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
