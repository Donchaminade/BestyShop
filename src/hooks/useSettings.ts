import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Settings, SettingsFormData } from '@/types/settings';
import { toast } from 'sonner';

const SETTINGS_QUERY_KEY = ['settings'];

export function useSettings() {
  return useQuery<Settings | null, Error>({ // Allow Settings | null
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single(); // Assuming there's only one settings row

      if (error) {
        // If no rows found, data is null and error has code 'PGRST116'
        if (error.code === 'PGRST116') { // No rows found
          return null; // Explicitly return null if no settings row exists
        }
        throw error; // Re-throw other errors
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache settings for 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation<Settings, Error, SettingsFormData & { id: string }>({
    mutationFn: async ({ id, ...settingsData }) => {
      const { data, error } = await supabase
        .from('settings')
        .update(settingsData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
      toast.success('Paramètres mis à jour avec succès');
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour des paramètres');
      console.error('Error updating settings:', error);
    },
  });
}
