import { PlayCircle } from 'lucide-react';
import { useState } from 'react';

interface AboutVideoContentProps {
  autoPlay?: boolean;
}

export function AboutVideoContent({ autoPlay = false }: AboutVideoContentProps) {
  const [hasPlayed, setHasPlayed] = useState(false);

  const handlePlay = () => {
    setHasPlayed(true);
  };

  return (
    <div className="relative w-full aspect-video rounded-xl shadow-elevated overflow-hidden group">
      {!hasPlayed && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 cursor-pointer"
          onClick={handlePlay}
        >
          <PlayCircle className="w-24 h-24 text-white hover:scale-110 transition-transform animate-pulse-glow-button" />
        </div>
      )}
      <video 
        src="/about.mp4" 
        controls 
        autoPlay={autoPlay || hasPlayed} 
        loop 
        muted 
        className="w-full h-full object-cover"
        onPlay={() => setHasPlayed(true)} // Ensure hasPlayed is true if video starts playing by other means
      >
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
}
