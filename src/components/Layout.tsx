import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20"> {/* Adjust padding to account for fixed header */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
