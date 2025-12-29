import { useState, useRef, useEffect } from 'react';
import { Settings, SettingsFormData } from '@/types/settings';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Loader2, Upload, X, ImageIcon, Video } from 'lucide-react'; // Added Video icon
import { toast } from 'sonner';

interface SettingsFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsFormDialog({ open, onOpenChange }: SettingsFormDialogProps) {
  const { data: currentSettings, isLoading: settingsLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const logoFileInputRef = useRef<HTMLInputElement>(null); // Renamed for clarity
  const videoFileInputRef = useRef<HTMLInputElement>(null); // New ref for video input

  const [formData, setFormData] = useState<SettingsFormData>({
    shop_name: '',
    logo_url: '',
    whatsapp_number: '',
    presentation_video_url: '',
    primary_color: '#32CD32', // Default primary color
  });
  const [uploadingLogo, setUploadingLogo] = useState(false); // Renamed for clarity
  const [uploadingVideo, setUploadingVideo] = useState(false); // New state for video upload
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(''); // Renamed for clarity
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(''); // New state for video preview

  useEffect(() => {
    if (currentSettings) {
      setFormData({
        shop_name: currentSettings.shop_name,
        logo_url: currentSettings.logo_url,
        whatsapp_number: currentSettings.whatsapp_number,
        presentation_video_url: currentSettings.presentation_video_url,
        primary_color: currentSettings.primary_color,
      });
      setLogoPreviewUrl(currentSettings.logo_url);
      setVideoPreviewUrl(currentSettings.presentation_video_url);
    }
  }, [currentSettings]);

  function handleOpenChange(open: boolean) {
    onOpenChange(open);
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) { // Renamed for clarity
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

    setUploadingLogo(true); // Using new state

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      setLogoPreviewUrl(publicUrl); // Using new state
      toast.success('Logo téléchargé');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors du téléchargement du logo');
    } finally {
      setUploadingLogo(false); // Using new state
    }
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) { // New function for video upload
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Veuillez sélectionner une vidéo');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('La vidéo ne doit pas dépasser 10MB');
      return;
    }

    setUploadingVideo(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('videos') // Using 'videos' bucket
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, presentation_video_url: publicUrl }));
      setVideoPreviewUrl(publicUrl);
      toast.success('Vidéo téléchargée');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors du téléchargement de la vidéo');
    } finally {
      setUploadingVideo(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.shop_name.trim()) {
      toast.error('Le nom de la boutique est requis');
      return;
    }
    if (!formData.logo_url.trim()) {
      toast.error('L\'URL du logo est requise');
      return;
    }
    if (!formData.whatsapp_number.trim()) {
      toast.error('Le numéro WhatsApp est requis');
      return;
    }
    if (!formData.presentation_video_url.trim()) {
        toast.error('L\'URL de la vidéo de présentation est requise');
        return;
    }
    if (!formData.primary_color.trim()) { // Validate primary color
        toast.error('La couleur principale est requise');
        return;
    }

    if (!currentSettings?.id) {
        toast.error('Impossible de mettre à jour les paramètres: ID non trouvé.');
        return;
    }

    try {
      await updateSettings.mutateAsync({ id: currentSettings.id, ...formData });
      handleOpenChange(false);
    } catch (error) {
      // Error handled in mutation
    }
  }

  const isLoading = updateSettings.isPending || settingsLoading || uploadingLogo || uploadingVideo; // Updated isLoading

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Modifier les paramètres généraux</DialogTitle>
          <DialogDescription>
            Ces paramètres affectent l\'ensemble de la boutique.
          </DialogDescription>
        </DialogHeader>

        {settingsLoading ? (
            <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* Shop Name */}
            <div className="space-y-2">
                <Label htmlFor="shop_name">Nom de la boutique *</Label>
                <Input
                id="shop_name"
                value={formData.shop_name}
                onChange={(e) => setFormData(prev => ({ ...prev, shop_name: e.target.value }))}
                placeholder=""
                required
                />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
                <Label>Logo de la boutique</Label>
                <div 
                className="relative border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => logoFileInputRef.current?.click()} // Use new ref
                >
                {logoPreviewUrl ? ( // Use new state
                    <div className="relative aspect-square w-24 h-24 rounded-lg overflow-hidden mx-auto">
                    <img 
                        src={logoPreviewUrl} // Use new state
                        alt="Logo Preview" 
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                        e.stopPropagation();
                        setLogoPreviewUrl(''); // Use new state
                        setFormData(prev => ({ ...prev, logo_url: '' }));
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
                    {uploadingLogo ? ( // Use new state
                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    ) : (
                        <ImageIcon className="w-6 h-6 mb-2" />
                    )}
                    <p className="text-sm">Cliquez pour télécharger un logo</p>
                    <p className="text-xs mt-1">PNG, JPG, WEBP (max 5MB)</p>
                    </div>
                )}
                <input
                    ref={logoFileInputRef} // Use new ref
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload} // Use new handler
                    className="hidden"
                />
                </div>
            </div>

            {/* Presentation Video Upload */}
            <div className="space-y-2">
                <Label>Vidéo de présentation</Label>
                <div 
                className="relative border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => videoFileInputRef.current?.click()} // Use new ref
                >
                {videoPreviewUrl ? ( // Use new state
                    <div className="relative aspect-video w-full h-auto rounded-lg overflow-hidden mx-auto">
                    <video
                        src={videoPreviewUrl} // Use new state
                        controls
                        className="w-full h-full object-cover"
                    >
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>
                    <button
                        type="button"
                        onClick={(e) => {
                        e.stopPropagation();
                        setVideoPreviewUrl(''); // Use new state
                        setFormData(prev => ({ ...prev, presentation_video_url: '' }));
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
                    {uploadingVideo ? (
                        <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    ) : (
                        <> {/* Wrap multiple elements in a Fragment */}
                            <Video className="w-6 h-6 mb-2" /> {/* Use Video icon */}
                            <p className="text-sm">Cliquez pour télécharger une vidéo</p>
                            <p className="text-xs mt-1">MP4, WEBM (max 10MB)</p>
                        </>
                    )}
                    </div>
                )}
                <input
                    ref={videoFileInputRef} // Use new ref
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload} // Use new handler
                    className="hidden"
                />
                </div>
            </div>

            {/* Primary Color */}
            <div className="space-y-2">
                <Label htmlFor="primary_color">Couleur principale *</Label>
                <Input
                id="primary_color"
                type="color" // Color picker
                value={formData.primary_color}
                onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                required
                />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
                <Label htmlFor="whatsapp_number">Numéro WhatsApp *</Label>
                <Input
                id="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                placeholder="+22899181626"
                required
                />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
                <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleOpenChange(false)}
                >
                Annuler
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Mettre à jour les paramètres
                </Button>
            </div>
            </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
