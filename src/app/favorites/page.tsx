import FavoritesClient from './FavoritesClient';

export const metadata = {
  title: 'My Favorites | RENTALS KONDAPUR',
  description: 'Your favorite rental properties in Kondapur.',
};

export default function FavoritesPage() {
  return (
    <div className="pt-24 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl mb-8">
          My <span className="text-gradient-emerald">Favorites</span>
        </h1>
        <FavoritesClient />
      </div>
    </div>
  );
}
