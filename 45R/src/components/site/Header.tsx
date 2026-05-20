import { Link } from '@/components';
import { ICON_SIZE } from '@/core';
import { useUserContext } from '@/hooks/useUserContext';
import { FaRegHeart } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';

export const Header = () => {
  const { userName, favorites } = useUserContext();

  return (
    <header className="bg-gray-800">
      <nav className="flex items-center gap-6 overflow-x-auto whitespace-nowrap p-4">
        <h1 className="text-2xl font-bold text-white shrink-0">TMDB Explorer</h1>

        <div className="flex items-center gap-4">
          <Link match={["/movies/category/:category"]} to="/movies/category/now_playing">Movies</Link>
          <Link match={["/tv/category/:category"]} to="/tv/category/airing_today">TV</Link>
          <Link match={["/trending/:category"]} to="/trending/movies">Trending</Link>
          <Link match={["/genre/:mediaType/:genre"]} to="/genre/movie/action">Genre</Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link match={["/search"]} to="/search">Search</Link>

          <span className="text-xl text-gray-300">{userName}</span>

          <Link match={["/favorites"]} to="/favorites">
            <span className="relative rounded-full p-2 transition hover:bg-gray-700">
              <FaRegHeart size={ICON_SIZE} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                  {favorites.size}
                </span>
              )}
            </span>
          </Link>

          <Link match={["/settings"]} to="/settings">
            <span className="rounded-full p-2 transition hover:bg-gray-700">
              <GoGear size={ICON_SIZE} />
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};