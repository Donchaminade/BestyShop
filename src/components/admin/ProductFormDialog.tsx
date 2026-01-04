import { useState, useRef, useEffect } from 'react';
import { Product, ProductFormData, ProductCategory } from '@/types/product';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Upload, X, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const predefinedCategories: ProductCategory[] = [
  'Farines bio',
  'Céréales bio',
  'Légumineuses bio',
  'Plantes et fleurs pour boissons naturelles',
  'Épices et condiments bio',
  'Racines et tubercules transformés',
  'Fruits séchés et dérivés',
  'Produits de cueillette traditionnelle',
  'Huiles végétales bio',
  'Sucres et édulcorants naturels',
  'Produits bien-être naturels',
  'Produits cosmétiques naturels bio'
];

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  isReadOnly?: boolean;
}

export function ProductFormDialog({ open, onOpenChange, product, isReadOnly = false }: ProductFormDialogProps) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    promo_price: product?.promo_price || null,
    promo_active: product?.promo_active || false,
    image_url: product?.image_url || '',
    category: product?.category || 'Farines bio', // Default to a new category
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const isEditing = !!product;

  useEffect(() => {
    if (open) {
      if (product) {
        setFormData({
          name: product.name,
          description: product.description || '',
          price: product.price,
          promo_price: product.promo_price,
          promo_active: product.promo_active,
          image_url: product.image_url || '',
          // If the product's category is not in our list, default to the first one
          category: predefinedCategories.includes(product.category) ? product.category : 'Fruits et Légumes',
        });
        setPreviewUrl(product.image_url || '');
      } else {
        resetForm();
      }
    }
  }, [open, product]);


  function resetForm() {
    setFormData({
      name: '',
      description: '',
      price: 0,
      promo_price: null,
      promo_active: false,
      image_url: '',
      category: 'Fruits et Légumes',
    });
    setPreviewUrl('');
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (isReadOnly) return;

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      setPreviewUrl(publicUrl);
      toast.success('Image téléchargée');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors du téléchargement');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isReadOnly) return;

    if (!formData.name.trim()) {
      toast.error('Le nom du produit est requis');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Le prix doit être supérieur à 0');
      return;
    }

    if (!formData.category || !predefinedCategories.includes(formData.category)) {
      toast.error('Veuillez sélectionner une catégorie valide');
      return;
    }

    try {
      if (isEditing && product) {
        await updateProduct.mutateAsync({ id: product.id, ...formData });
      } else {
        await createProduct.mutateAsync(formData);
      }
      handleOpenChange(false);
    } catch (error) {
      // Error handled in mutation
    }
  }

  const isLoading = createProduct.isPending || updateProduct.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isReadOnly ? 'Détails du produit' : (isEditing ? 'Modifier le produit' : 'Nouveau produit')}
          </DialogTitle>
          <DialogDescription>
            {isReadOnly ? 'Affichage des détails du produit en lecture seule.' : (isEditing ? 'Mettez à jour les détails du produit.' : 'Créez un nouveau produit pour votre boutique.')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          
          {/* (Image, Name, Description parts are the same) */}
          <div className="space-y-2">
            <Label>Image du produit</Label>
            <div 
              className="relative border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => !isReadOnly && fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewUrl('');
                        setFormData(prev => ({ ...prev, image_url: '' }));
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  ) : (
                    <ImageIcon className="w-8 h-8 mb-2" />
                  )}
                  <p className="text-sm">Cliquez pour télécharger une image</p>
                  <p className="text-xs mt-1">PNG, JPG, WEBP (max 5MB)</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Tomates fraîches de la ferme"
              required
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description du produit..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ProductCategory) => {
                if (!isReadOnly) {
                  setFormData(prev => ({ ...prev, category: value }));
                }
              }}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {predefinedCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* (Price, Promo, Submit parts are the same) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (FCFA) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                placeholder="15000"
                min="0"
                required
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo_price">Prix promo (FCFA)</Label>
              <Input
                id="promo_price"
                type="number"
                value={formData.promo_price || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  promo_price: e.target.value ? parseInt(e.target.value) : null
                }))}
                placeholder="12000"
                min="0"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="promo_active" className="text-base">Promotion active</Label>
              <p className="text-sm text-muted-foreground mt-0.5">
                Afficher le prix promo sur le produit
              </p>
            </div>
            <Switch
              id="promo_active"
              checked={formData.promo_active}
              onCheckedChange={(checked) => !isReadOnly && setFormData(prev => ({ ...prev, promo_active: checked }))}
              disabled={isReadOnly}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => handleOpenChange(false)}
            >
              {isReadOnly ? 'Fermer' : 'Annuler'}
            </Button>
            {!isReadOnly && (
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? 'Mettre à jour' : 'Créer le produit'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
