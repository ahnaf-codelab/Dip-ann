import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift, Smile, Frown } from 'lucide-react';

export default function ProposalSection() {
  const [proposed, setProposed] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [proposalConfetti, setProposalConfetti] = useState<{ id: number; color: string; left: number; delay: number; duration: number; scale: number }[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Run away logic for NO button on desktop hover or mobile taps
  const handleNoHoverOrClick = () => {
    // Increase sad click count
    setNoClickCount(prev => prev + 1);
    
    // Shake screen effect
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // Set mobile flag or desktop hop offset
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate random safe coordinates inside proposals space
      const newX = (Math.random() - 0.5) * (rect.width * 0.7);
      const newY = (Math.random() - 0.5) * (rect.height * 0.4);
      setNoButtonPos({ x: newX, y: newY });
    }
    setNoClicked(true);
  };

  const handleYesClick = () => {
    setProposed(true);
    setNoClicked(false);
    
    // Spawns 150 floating colorful romantic confetti pieces
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#ff1493', '#ff69b4', '#9932cc', '#ffdf00'];
    const list = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100, // percentage x width
      delay: Math.random() * 2, // stagger falling
      duration: Math.random() * 3 + 2.5,
      scale: Math.random() * 0.8 + 0.4
    }));
    setProposalConfetti(list);
  };

  return (
    <section 
      id="proposal-section" 
      ref={containerRef}
      className={`py-24 px-4 md:px-8 relative overflow-hidden transition-all duration-1000 bg-transparent ${isShaking ? 'animate-[shake_0.4s_ease-in-out_infinite]' : ''}`}
    >
      
      {/* Visual styles for shake keyframes */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes proposal-fall {
          0% { transform: translateY(-30px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
        }
      `}</style>

      {/* Floating Sparkles & Light glow blobs */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] ${proposed ? 'bg-rose-400' : 'bg-pink-100'} rounded-full blur-[90px] opacity-25 pointer-events-none transition-colors duration-1000`} />

      {/* YES Confetti Rain */}
      {proposed && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {proposalConfetti.map(item => (
            <div
              key={item.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: item.color,
                left: `${item.left}%`,
                top: '-20px',
                animationName: 'proposal-fall',
                animationDuration: `${item.duration}s`,
                animationTimingFunction: 'linear',
                animationFillMode: 'forwards',
                animationDelay: `${item.delay}s`,
                transform: `scale(${item.scale})`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        <AnimatePresence mode="wait">
          {!proposed ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 md:p-12 rounded-3xl shadow-2xl border border-white/60 max-w-2xl mx-auto backdrop-blur-xl relative"
            >
              
              {/* Proposal Ring Illustration SVG */}
              <div className="flex justify-center mb-8 relative">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center shadow-inner relative"
                >
                  <span className="text-4xl">💍</span>
                </motion.div>
                {/* Float floating hearts near ring */}
                <span className="absolute top-0 right-1/3 text-rose-500 animate-ping">❤️</span>
                <span className="absolute bottom-2 left-1/3 text-pink-400 animate-bounce">💖</span>
              </div>

              {/* proposal questions */}
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200">সারাজীবনের জন্য অঙ্গীকার</span>
              
              <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-extrabold mt-6 mb-8 leading-snug glowing-pink-text">
                Will You Marry Me My JAAAAAAN? 💖💍
              </h2>

              <p className="text-gray-650 font-sans text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
                ৪ বছর আগের পথচলা আমি আজীবন ধরে রাখতে চাই। তুমি কি অনুমতি দেবে সারা জীবন তোমার সমস্ত দুঃখ কেড়ে নিয়ে শুধু আনন্দ উপহার দেওয়ার?
              </p>

              {/* Action Buttons with absolute offsets for NO button running behavior */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[100px] relative">
                
                {/* YES Button Ring */}
                <motion.button
                  id="proposal-btn-yes"
                  onClick={handleYesClick}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-serif font-extrabold text-xl shadow-lg hover:shadow-rose-400/50 cursor-pointer glowing-pink-btn flex items-center gap-2.5 z-20"
                >
                  <span>YES, I WILL! 💍❤️</span>
                </motion.button>

                {/* NO Button Element */}
                <motion.button
                  id="proposal-btn-no"
                  onMouseEnter={handleNoHoverOrClick}
                  onClick={handleNoHoverOrClick}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                  className="px-7 py-3.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-sans font-bold text-sm shadow cursor-pointer transition-colors z-20"
                  style={{ touchAction: 'none' }}
                >
                  <span>NO 😭</span>
                </motion.button>

              </div>

              {/* Sad Rejection Response */}
              <AnimatePresence>
                {noClicked && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="mt-8 p-4 bg-rose-50/80 rounded-2xl border border-rose-200 flex flex-col items-center gap-2 shadow-inner"
                  >
                    <div className="flex items-center gap-2">
                      <Frown className="w-5 h-5 text-rose-500 animate-spin" />
                      <span className="font-serif text-rose-600 font-extrabold text-base">
                        {noClickCount >= 4 ? "পাগলী নাকি! না বলা যাবে না! 😠💔" : "এত সহজে না বলা যাবে না 😭💔"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-sans">
                      হাত জোড় করে রিকোয়েস্ট করছি, তুমি শুধু YES বাটনটাই চাপো!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ) : (
            // YES Clicked - Show Beautiful Cinematic Slideshow & Final letters
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="glass-panel p-6 md:p-12 rounded-[2.5rem] shadow-2xl border-2 border-pink-400/30 max-w-3xl mx-auto bg-white/70 relative"
            >
              
              {/* Back glowing sparks */}
              <div className="absolute -top-12 -right-12 text-yellow-300 animate-pulse pointer-events-none">
                <Sparkles className="w-24 h-24" fill="currentColor" />
              </div>

              {/* Celebrating animation block */}
              <span className="text-xl animate-bounce inline-block mb-3">🌹💍💑💘💖</span>

              <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 font-extrabold mb-6 glowing-pink-text">
                জান, আই লাভ ইউ সো মাচ! 😍❤️
              </h2>

              <p className="text-emerald-600 font-serif text-lg md:text-xl font-bold mb-8">
                “তুমি ‘হ্যাঁ’ বলে আমাকে পৃথিবীর সবচেয়ে সুখী মানুষ বানিয়ে ফেলেছ!” 💖
              </p>

              {/* Dynamic lovely couple sliding card elements */}
              <div className="my-8 max-w-lg mx-auto p-2 bg-white/80 border border-pink-200 rounded-3xl shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80" 
                  alt="Forever Together Celebration"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-inner animate-[pulse-slow_6s_infinite]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Final Love Letter in Proposal section */}
              <div className="bg-rose-50/60 rounded-3xl p-6 md:p-8 text-justify leading-relaxed border border-rose-300/40 relative">
                <div className="absolute top-2 left-2 text-rose-200/40 pointer-events-none select-none">
                  <Heart className="w-16 h-16 fill-current" />
                </div>
                
                <h4 className="font-serif text-pink-600 text-lg font-bold mb-3 text-center border-b border-pink-200/50 pb-2">
                  আমাদের অন্তহীন নতুন দিগন্ত 🌸💍
                </h4>
                
                <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed">
                  "আজ থেকে আমাদের সম্পর্কের এক নতুন দরজা খুলে গেল। চারটা বছর তো শুধু শুরু ছিল, আমি তোমাকে সারাজীবনের সুখে ভাসাতে চাই। তোমার প্রতিটি স্বপ্ন পূরণ করতে, তোমার চোখের কোণের অশ্রু মুছে হাসিতে ভরে দিতে আমার পুরো জীবনটাও বাজি লাগাতে পারি। হৃদয়ের অবিচ্ছেদ্য অংশ হিসেবে এভাবেই চিরকাল আমার পাশে থেকো। আই লাভ ইউ মাই জান!"
                </p>
                
                <div className="mt-5 flex items-center justify-end gap-1.5 text-xs text-pink-600 font-serif font-bold">
                  <span>ইতি, তোমার রাজপুত্র / রাজকন্যা 💖</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
