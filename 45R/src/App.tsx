import { MainLayout } from '@/layouts';
import {
  CareerView,
  CartView,
  CreditsView,
  EpisodeView,
  ErrorView,
  FavoritesView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  NowPlayingView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SettingsView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      {/* ---------------------Less Confusion for me------------------------------ */}

      <Route path="/" element={<HomeView />} />
      {/* ------------------------------------------------------------------------------- */}
      <Route element={<MainLayout />}>
        <Route path="now-playing" element={<NowPlayingView />} />
        <Route path="trending/:category" element={<TrendingView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="movies/category/:category" element={<MoviesView />} />
        <Route path="tv/category/:category" element={<TelevisionView />} />
        {/* ------------------------------------------------------------------------------- */}
        <Route path="movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        {/* ------------------------------------------------------------------------------- */}
        <Route path="/tv/:id" element={<MovieView />}>
          <Route path="season/:season" element={<EpisodeView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="seasons" element={<SeasonsView />} />
        </Route>
        {/* ------------------------------------------------------------------------------- */}
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
        {/* ------------------------------------------------------------------------------- */}
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="genre/:mediaType/:genre" element={<GenreView />} />
      </Route>
      {/* ------------------------------------------------------------------------------- */}
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
