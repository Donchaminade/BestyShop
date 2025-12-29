export interface Settings {
  id: string;
  shop_name: string;
  logo_url: string;
  whatsapp_number: string;
  presentation_video_url: string;
  primary_color: string; // New: primary color for the website
  created_at: string;
  updated_at: string;
}

export interface SettingsFormData {
  shop_name: string;
  logo_url: string;
  whatsapp_number: string;
  presentation_video_url: string;
  primary_color: string; // New: primary color for the website
}
