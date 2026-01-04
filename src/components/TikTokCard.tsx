// src/components/TikTokCard.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, AlertTriangle } from 'lucide-react';

interface TikTokCardProps {
  tiktokUrl: string;
}

interface OEmbedData {
  thumbnail_url: string;
  title: string;
  author_name: string;
}

export function TikTokCard({ tiktokUrl }: TikTokCardProps) {
  const [oembedData, setOembedData] = useState<OEmbedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOembed = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/tiktok-oembed?url=${encodeURIComponent(tiktokUrl)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch TikTok preview');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.details || 'Error from oEmbed API');
        }
        setOembedData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(`Failed to load TikTok oEmbed for ${tiktokUrl}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOembed();
  }, [tiktokUrl]);

  if (isLoading) {
    return (
      <div className="p-1">
        <Card className="h-full flex flex-col">
          <Skeleton className="w-full aspect-[9/16] rounded-t-lg" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !oembedData) {
    return (
      <div className="p-1">
        <Card className="h-full flex flex-col group">
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-[9/16] rounded-lg overflow-hidden bg-destructive/20">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-destructive">
              <AlertTriangle className="w-8 h-8 mb-2" />
              <p className="text-xs font-semibold">Impossible de charger l'aperçu</p>
              <p className="text-xs mt-2">Cliquez pour voir la vidéo sur TikTok</p>
            </div>
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-1">
      <Card className="h-full flex flex-col group">
        <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-[9/16] rounded-lg overflow-hidden">
          <img
            src={oembedData.thumbnail_url}
            alt={oembedData.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-12 h-12 text-white" />
          </div>
        </a>
        <CardContent className="flex-grow flex flex-col justify-center items-center text-center p-4">
          <p className="text-sm font-semibold mt-2 line-clamp-3" title={oembedData.title}>
            {oembedData.title || `Vidéo de ${oembedData.author_name}`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
