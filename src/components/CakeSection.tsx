import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function CakeSection() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; scale: number }[]>([]);

  // Array of 4 candles for the 4th anniversary
  const [candles, setCandles] = useState([
    { id: 1, lit: true, offset: '-x-10' },
    { id: 2, lit: true, offset: '-x-3' },
    { id: 3, lit: true, offset: 'x-3' },
    { id: 4, lit: true, offset: 'x-10' },
  ]);

  const generateConfetti = () => {
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#3b82f6', '#10b981', '#fbbf24'];
    const list = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * -80 - 10,  // start offset y
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.8 + 0.4
    }));
    setConfetti(list);
  };

  const blowOutCandle = (id: number) => {
    if (candlesBlown) return;

    setCandles(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, lit: false } : c);
      
      // If all are now lit: false, trigger complete anniversary celebration!
      const allExtinguished = updated.every(c => !c.lit);
      if (allExtinguished) {
        setCandlesBlown(true);
        generateConfetti();
      }
      return updated;
    });
  };

  const blowAllCandles = () => {
    setCandles(prev => prev.map(c => ({ ...c, lit: false })));
    setCandlesBlown(true);
    generateConfetti();
  };

  const resetCake = () => {
    setCandles(prev => prev.map(c => ({ ...c, lit: true })));
    setCandlesBlown(false);
    setConfetti([]);
  };

  return (
    <section id="cake-section" className="py-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      
      {/* Dynamic flying confetti layer */}
      {candlesBlown && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {confetti.map(item => (
            <motion.div
              key={item.id}
              initial={{ y: -50, x: `${item.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ 
                y: '105vh', 
                x: `${item.x + (Math.random() * 10 - 5)}vw`,
                opacity: 0.1, 
                rotate: 720 
              }}
              transition={{ duration: Math.random() * 2.8 + 2.2, ease: 'easeOut' }}
              className="absolute w-2.5 h-2.5 rounded-sm"
              style={{ 
                backgroundColor: item.color,
                transform: `scale(${item.scale})` 
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Section Title */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-sans text-rose-400 bg-pink-100/50 px-4 py-1.5 rounded-full border border-pink-200/50 uppercase tracking-widest font-bold">অ্যানিভার্সারি কেক</span>
            <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mt-4 mb-2 glowing-pink-text">
              ৪ বছরের ভালোবাসা উদযাপন 🎂
            </h2>
            <p className="text-gray-500 font-sans text-xs md:text-sm max-w-sm mx-auto">
              {candlesBlown 
                ? 'ইয়েএএ! ৪টি মোমবাতি নিভে গেল! আমাদের জীবন সবসময় এভাবেই মিষ্টি আলোয় ভরে উঠুক ✨' 
                : 'কেকের ৪টি মোমবাতির ওপর ক্লিক করে অথবা নিচ থেকে ফুঁ দিয়ে নেভাও! 🎉'
              }
            </p>
          </motion.div>
        </div>

        {/* Big Cake Container */}
        <div className="flex flex-col items-center justify-center min-h-[340px]">
          
          <div className="relative inline-block mt-4 select-none">
            
            {/* Candle Sparks/Glow circles */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex justify-center gap-6 z-20 w-36 pointer-events-none">
              {candles.map((candle, idx) => (
                <div key={idx} className="w-5 h-5 relative flex justify-center items-center">
                  <AnimatePresence>
                    {candle.lit && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.25, 1] }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
                        className="absolute w-12 h-12 bg-rose-300 rounded-full blur-md"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Candle Elements on Top */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex justify-center gap-7 z-25 w-36">
              {candles.map((candle) => (
                <div 
                  key={candle.id} 
                  onClick={() => blowOutCandle(candle.id)}
                  className="group flex flex-col items-center cursor-pointer"
                  title="মোমবাতি নেভাতে ক্লিক করো"
                >
                  {/* Candle Fire Flame */}
                  <AnimatePresence>
                    {candle.lit ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [1, 1.15, 0.95, 1], 
                          rotate: [0, -3, 3, 0],
                          y: [0, -1, 1, 0] 
                        }}
                        exit={{ 
                          scale: 0, 
                          opacity: 0,
                          transition: { duration: 0.15 } 
                        }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="w-3.5 h-6 bg-gradient-to-t from-yellow-300 via-rose-500 to-amber-300 rounded-full shadow-[0_0_8px_#f59e0b] filter drop-shadow relative"
                        style={{ transformOrigin: 'bottom center' }}
                      >
                        <div className="absolute bottom-1 left-1 w-1.5 h-3 bg-white rounded-full opacity-40"></div>
                      </motion.div>
                    ) : (
                      // Blowout Sparks/Smoke
                      <motion.span 
                        initial={{ scale: 1, opacity: 0.9 }}
                        animate={{ y: -25, scale: [0.8, 0], opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="text-xs text-gray-400 absolute font-sans font-bold"
                      >
                        ✨💨
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Candle Stick */}
                  <div className={`w-2.5 h-10 rounded-t ${candle.id % 2 === 0 ? 'bg-pink-300' : 'bg-rose-400'} border-x border-t border-white/40 shadow-inner relative mt-1`}>
                    {/* Cute stripes inside candle stick */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-black/10"></div>
                    <div className="w-full h-1/4 bg-white/30 rotate-12 absolute top-2"></div>
                    <div className="w-full h-1/4 bg-white/30 rotate-12 absolute top-5"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D delicious looking Pink Cake tiers */}
            <div className="flex flex-col items-center">
              
              {/* Tier 1 (Top Tier - Smallest) */}
              <div className="w-36 h-12 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 rounded-t-2xl border-b border-pink-400/30 flex items-center justify-center shadow-lg relative z-10">
                {/* Anniversary number */}
                <div className="absolute -top-1.5 px-2 bg-white rounded-full border border-pink-300 text-pink-600 text-xs font-mono font-bold tracking-tight shadow">
                  4 Years 💖
                </div>
                {/* Whipped cream drops */}
                <div className="absolute -bottom-1 inset-x-0 h-2.5 flex justify-between px-2">
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                </div>
              </div>

              {/* Tier 2 (Middle Tier) */}
              <div className="w-52 h-14 bg-gradient-to-r from-pink-400 via-rose-450 to-pink-400 rounded-t-2xl border-b border-pink-500/30 flex items-center justify-center shadow-xl relative z-8">
                {/* Whipped Strawberry Toppings */}
                <span className="text-xl -translate-y-1">🍓 ✨ 🍓 ✨ 🍓</span>
                
                {/* Middle Cream line */}
                <div className="absolute inset-x-0 top-6 h-1.5 bg-white shadow-inner"></div>

                {/* Cream drips down */}
                <div className="absolute -bottom-1.5 inset-x-0 h-3 flex justify-around px-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-100 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-100 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-100 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-100 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-100 shadow-inner"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-pink-100 shadow-inner"></div>
                </div>
              </div>

              {/* Tier 3 (Bottom Tier - Largest) */}
              <div className="w-72 h-18 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 rounded-t-3xl border-b border-pink-700/20 flex items-center justify-center shadow-2xl relative z-6">
                
                {/* Embedded dynamic text on the cake frosting */}
                <p className="font-serif text-white font-extrabold text-sm md:text-base tracking-widest brightness-110 drop-shadow">
                  HAPPY 4TH ANNIVERSARY
                </p>

                {/* Sparkling floral drops */}
                <div className="absolute inset-x-0 bottom-1 flex justify-around px-8 text-rose-350 opacity-80 text-xs">
                  <span>🌸</span> <span>🌸</span> <span>🌸</span> <span>🌸</span> <span>🌸</span>
                </div>
              </div>

              {/* Cake Dish / Stand Plate */}
              <div className="w-80 h-4 bg-gradient-to-r from-pink-100 via-white to-pink-100 rounded-full border border-pink-200/50 shadow-md relative z-4 mt-0.5"></div>
              {/* Stand Leg */}
              <div className="w-24 h-6 bg-gradient-to-b from-white to-pink-100 rounded-b-xl border border-pink-200/40 shadow"></div>

            </div>

          </div>

          {/* Blowout Trigger block */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {!candlesBlown ? (
              <button
                id="blow-all-btn"
                onClick={blowAllCandles}
                className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-serif font-bold text-base shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer glowing-pink-btn flex items-center gap-2"
              >
                <span>ক্যান্ডেল এক ক্লিকে নেভাও 💨 🎂</span>
              </button>
            ) : (
              <button
                id="cake-relight-btn"
                onClick={resetCake}
                className="px-5 py-2.5 rounded-full bg-gray-400 hover:bg-gray-500 text-white font-sans text-sm shadow transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                মোমবাতিগুলো আবার জ্বালাও 🕯️
              </button>
            )}
          </div>

          {/* Glowing Romantic Message appears after blowing candles */}
          <AnimatePresence>
            {candlesBlown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 15 }}
                transition={{ type: 'spring', damping: 20 }}
                className="mt-10 max-w-lg mx-auto glass-panel p-6 rounded-2xl border border-rose-300/60 shadow-xl relative"
              >
                {/* Floating star decorations inside block */}
                <div className="absolute top-2 right-2 text-rose-450 animate-bounce">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif text-pink-600 font-extrabold mb-3">
                  সব আলো ছড়াচ্ছে তোমাতে 🌸✨
                </h3>
                <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed">
                  "মোমবাতি নিভে গেলেও আমাদের জীবনের সেই মধুর আলো কখনো কমবে না। বছরের পর বছর একে অপরের আলো হয়ে এভাবেই পথ চলবো। তোমার ভালোবাসা আমার জীবনের সেরা উদযাপিত উৎসব, জান!"
                </p>

                {/* Bottom love signature seal */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-serif text-rose-500 font-bold">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>চিরকাল তোমার, সুদূর ভবিষ্যৎ পর্যন্ত</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
