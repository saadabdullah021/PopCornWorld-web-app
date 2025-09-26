import React, { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

const VideoPlayer = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayClick = () => {
    setIsLoading(true);
    setPlayVideo(true);
  };

  const videoId = "VMmgSrI5QAg";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`;

  return (


      
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        {playVideo ? (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="ml-2 text-white">Loading video...</span>
              </div>
            )}
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              className="absolute inset-0"
            />
          </div>
        ) : (
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handlePlayClick}
          >
            {/* Thumbnail Image */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border-4 border-white/30">
                <Play className="w-8 h-8 text-white ml-1 fill-white" />
              </div>
            </div>
            
            {/* Video Info */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold drop-shadow-lg">
                Click to play video
              </h3>
            </div>
          </div>
        )}
      </div>
  
  );
};

export default VideoPlayer;