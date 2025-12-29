import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Search,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Settings,
} from 'lucide-react';
import { ProductFormDialog } from '@/components/admin/ProductFormDialog';
import { SettingsFormDialog } from '@/components/admin/SettingsFormDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useSettings } from '@/hooks/useSettings';

export default function AdminProductsPage() {
  const navigate = useNavigate();

  /* ================= AUTH ================= */
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();

  /* ================= SETTINGS ================= */
  const {
    data: settings,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useSettings();

  const shopName = settings?.shop_name ?? 'BestyShop';
  const logoUrl = settings?.logo_url ?? '/logo.jpeg';

  /* ================= PAGINATION ================= */
  const PRODUCTS_PER_PAGE = 25;
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= DATA ================= */
  const {
    data: productsQueryResult,
    isLoading: productsLoading,
  } = useProducts({
    page: currentPage,
    pageSize: PRODUCTS_PER_PAGE,
  });

  const products = productsQueryResult?.data ?? [];
  const totalProducts = productsQueryResult?.count ?? 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const deleteProduct = useDeleteProduct();

  /* ================= UI STATE ================= */
  const [searchQuery, setSearchQuery] = useState('');
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isSettingsFormOpen, setIsSettingsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  /* ================= FILTER (OPTIMISÉ) ================= */
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  /* ================= ACTIONS ================= */
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteConfirm(product);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    await deleteProduct.mutateAsync(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  /* ================= LOADERS & ERRORS ================= */
  if (authLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (settingsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Accès refusé</p>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} className="w-10 h-10 rounded-lg" />
            <span className="font-display text-xl hidden sm:block">
              {shopName}
            </span>
            <Badge variant="secondary">Admin</Badge>
          </Link>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsSettingsFormOpen(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                navigate('/auth');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display">Gestion Produits</h1>
            <p className="text-muted-foreground">
              {totalProducts} produit(s)
            </p>
          </div>
          <Button onClick={() => setIsProductFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>

        {/* SEARCH */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead className="hidden sm:table-cell">Promo</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="w-12 h-12 rounded" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredProducts.length ? (
                filteredProducts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <img
                        src={p.image_url || '/placeholder.svg'}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {p.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{p.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={p.promo_active ? 'text-muted-foreground line-through text-xs' : ''}>
                          {formatPrice(p.price)}
                        </span>
                        {p.promo_active && p.promo_price && (
                          <span className="text-primary font-medium">
                            {formatPrice(p.promo_price)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {p.promo_active ? (
                        <Badge className="bg-promo text-promo-foreground">Promo</Badge>
                      ) : (
                        <Badge variant="secondary">-</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(p)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(p)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Aucun produit
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </main>

      {/* DIALOGS */}
      <ProductFormDialog
        open={isProductFormOpen}
        onOpenChange={setIsProductFormOpen}
        product={editingProduct}
      />

      <SettingsFormDialog
        open={isSettingsFormOpen}
        onOpenChange={setIsSettingsFormOpen}
      />

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le produit ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
