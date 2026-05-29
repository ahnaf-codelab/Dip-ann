import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ZoomIn } from 'lucide-react';
import { PhotoItem } from '../types';

const galleryPhotos: PhotoItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
    caption: 'প্রথম দেখা 🌸',
    date: '২৯ মে, ২০২২'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    caption: 'প্রথম ঘুরতে যাওয়া 💖',
    date: '২৪ ডিসেম্বর, ২০২২'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    caption: 'সবচেয়ে সুন্দর মুহূর্ত ✨',
    date: '১২ অক্টোবর, ২০২৩'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    caption: 'একসাথে হাজারো হাসি 😄',
    date: '০৪ মার্চ, ২০২৪'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    caption: 'আজকের ৪ বছর পূর্তি 🎉',
    date: '২৯ মে, ২০২৬'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    caption: 'ছোট ছোট খুনসুটি 🙈',
    date: '১৯ আগস্ট, ২০২৫'
  }
];

export default function PhotoGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Custom tilt for each polaroid index to look random and organic
  const getTiltClass = (idx: number) => {
    const tilts = [
      'hover:rotate-1 rotate-1',
      'hover:-rotate-2 -rotate-1',
      'hover:rotate-2 rotate-2',
      'hover:-rotate-1 -rotate-2',
      'hover:-rotate-2 rotate-1',
      'hover:rotate-3 -rotate-2',
    ];
    return tilts[idx % tilts.length];
  };

  return (
    <section id="gallery-section" className="py-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono text-rose-500 uppercase tracking-widest bg-rose-100/60 px-4 py-1.5 rounded-full border border-pink-200">স্মৃতির ডায়েরি</span>
            <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mt-4 mb-3 glowing-pink-text">
              আমাদের কাটানো প্রিয় মুহূর্তগুলো 💕
            </h2>
            <p className="text-gray-500 font-sans text-sm md:text-base max-w-md mx-auto">
              এই ছবিগুলো শুধু মুহূর্ত নয়, আমাদের একেকটি দীর্ঘ সুখের ইতিহাস
            </p>
          </motion.div>
        </div>
 
        {/* Polaroid Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {galleryPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`glass-panel p-4 pb-6 shadow-xl rounded-2xl cursor-pointer select-none transition-all duration-300 ${getTiltClass(idx)}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Photo Image container */}
              <div className="relative aspect-[4/3] bg-pink-100/20 rounded-xl overflow-hidden group">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Zoom Indicator */}
                <div className="absolute inset-0 bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-rose-500"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Caption (Bengali handwritten vibe) */}
              <div className="mt-5 text-center px-2">
                <p className="font-serif text-pink-500 text-lg md:text-xl font-bold tracking-wide">
                  {photo.caption}
                </p>
                <p className="text-xs text-gray-400 font-sans mt-1">
                  📅 {photo.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="absolute top-4 right-4 z-55">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <motion.div 
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white p-5 pb-7 max-w-2xl w-full rounded-2xl shadow-2xl relative overflow-hidden text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Back decorative hearts */}
                <div className="absolute -left-4 -top-4 text-pink-100 opacity-20 pointer-events-none">
                  <Heart className="w-24 h-24" fill="currentColor" />
                </div>

                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-inner bg-gray-50 border border-gray-100"
                  referrerPolicy="no-referrer"
                />

                <div className="mt-5">
                  <h3 className="font-serif text-pink-600 text-2xl font-bold">
                    {selectedPhoto.caption}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans mt-2">
                    {selectedPhoto.date}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
