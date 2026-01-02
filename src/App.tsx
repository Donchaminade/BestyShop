import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import About from "./pages/About"; // Import new page
import Contact from "./pages/Contact"; // Import new page
import Products from "./pages/Products"; // Import new page
import Promo from "./pages/Promo"; // Import new page
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout"; // Import Layout
import { useSettings } from "./hooks/useSettings"; // Import useSettings
import { useEffect } from "react"; // Import useEffect
import { Loader2, AlertCircle } from "lucide-react"; // Import Loader2, AlertCircle
import { hexToHsl } from './lib/colorUtils'; // Import hexToHsl

const queryClient = new QueryClient();

const AppContent = () => {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings();

  useEffect(() => {
    if (settings && settings.primary_color) {
      const primaryHsl = hexToHsl(settings.primary_color);
      // For primary-foreground, we aim for a dark color that contrasts well.
      // A simplified way is to check the lightness of the primary color.
      // If primary is light, foreground is dark. If primary is dark, foreground is light.
      // For this example, we'll keep a fixed dark foreground, but a more advanced solution would calculate contrast.
      const primaryForegroundHsl = '220 20% 6%'; // Dark background-like color

      // For light variant of primary for gradients
      // This is a rough estimation; a real-world app would use a library or more sophisticated logic
      const [h, s, l_str] = primaryHsl.split(' ');
      const l = parseInt(l_str.replace('%', ''));
      const primaryLightHsl = `${h} ${s} ${Math.min(l + 10, 100)}%`; // Make it 10% lighter

      document.documentElement.style.setProperty('--primary', primaryHsl);
      document.documentElement.style.setProperty('--primary-foreground', primaryForegroundHsl);
      document.documentElement.style.setProperty('--accent', primaryHsl); // Accent often mirrors primary
      document.documentElement.style.setProperty('--accent-foreground', primaryForegroundHsl);
      document.documentElement.style.setProperty('--ring', primaryHsl);
      document.documentElement.style.setProperty('--success', primaryHsl);
      document.documentElement.style.setProperty('--sidebar-primary', primaryHsl);
      document.documentElement.style.setProperty('--sidebar-primary-foreground', primaryForegroundHsl);
      document.documentElement.style.setProperty('--sidebar-ring', primaryHsl);
      document.documentElement.style.setProperty('--primary-light', primaryLightHsl); // For gradients
    }
  }, [settings?.primary_color]);

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (settingsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
          <h1 className="font-display text-2xl mb-2">Erreur critique</h1>
          <p className="text-muted-foreground mb-6">
            Impossible de charger les paramètres de base de l'application.
          </p>
          <Button onClick={() => window.location.reload()}>
            Recharger l'application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}> {/* Use Layout as parent route */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/promosection" element={<Promo />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} /> {/* Place NotFound outside Layout if it should not have header/footer */}
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent /> {/* Render the new AppContent component */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
