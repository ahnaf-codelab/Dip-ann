import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Heart, Headphones } from 'lucide-react';

export default function VoiceMessageSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(16).fill(5));
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  
  const synthTimerRef = useRef<number | null>(null);
  const visualizerTimerRef = useRef<number | null>(null);
  const textProgressRef = useRef(0);

  const fullBengaliMessage = "হাই সোনা... চারটা বছর দেখতে দেখতে কেমন দ্রুত কেটে গেল, তাই না? মনে হয় এই তো সেদিন প্রথম তোমার হাতটা ধরলাম! তোমার ওই মিষ্টি হাসি, কিউট রাগ, আর প্রতিটি ছোটখাটো যত্ন আমার পুরো অস্তিত্বটাই বদলে দিয়েছে। যেকোনো বিপদে বা দুঃসময়ে তুমি যেভাবে আমার পাহাড়ের মতো ভরসা হয়ে পাশে দাঁড়িয়েছ, তার জন্য কতখানি কৃতজ্ঞ তা ভাষা দিয়ে প্রকাশ করা অসম্ভব। আমি শুধু চাই, আমাদের আগামী দিনগুলোও যেন একই রকম ভালোবাসায় মাখামাখি হয়ে কেটে যাক। বুড়ো বয়সেও কুঁচকানো চামড়ার হাত জোড়া এভাবেই ধরে একসাথে বারান্দায় চা খাবো। শুভ ৪র্থ রিলেশন অ্যানিভার্সারি আমার চাঁদের আলো... অনেক অনেক ভালোবাসি তোমাকে! 💖";

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const initAudio = () => {
    if (audioCtx) return audioCtx;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      setAudioCtx(ctx);
      return ctx;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const triggerSoftSynthNode = (ctx: AudioContext, freq: number, time: number, dur: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const lowpass = ctx.createBiquadFilter();

    osc.type = 'sine'; // Super soft mellow bell sound
    osc.frequency.value = freq;

    lowpass.type = 'lowpass';
    lowpass.frequency.value = 650;

    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.08, time + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + dur);
  };

  const melodyNotes = [
    523.25, 587.33, 659.35, 698.46, 783.99, 880.00, 987.77, // C5 to B5
    523.25 * 1.5, 587.33 * 1.5, 659.35 * 1.5 // Soft harmonics
  ];

  const startAudio = (ctx: AudioContext) => {
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let noteIdx = 0;
    const playNextMellowBell = () => {
      if (!ctx) return;
      const time = ctx.currentTime;
      // Procedurally play warm, sparkly acoustic chimes simulating voice rhythms
      const freq = melodyNotes[noteIdx % melodyNotes.length];
      triggerSoftSynthNode(ctx, freq, time, 2.5);

      noteIdx = (noteIdx + 1) % melodyNotes.length;
      
      // Schedule next bells
      const nextDelay = Math.random() * 800 + 400; // Between 400ms and 1200ms for vocal rhythm speed
      synthTimerRef.current = window.setTimeout(playNextMellowBell, nextDelay);
    };

    // Render random visualizer movements
    const updateVisualizer = () => {
      setVisualizerBars(() => {
        return new Array(18).fill(0).map(() => Math.floor(Math.random() * 45) + 8);
      });
      visualizerTimerRef.current = window.setTimeout(updateVisualizer, 110);
    };

    // Begin sound and graphics
    playNextMellowBell();
    updateVisualizer();

    // Typewriter effect synchronised
    const tickText = () => {
      if (textProgressRef.current < fullBengaliMessage.length) {
        textProgressRef.current += 1;
        setTypedText(fullBengaliMessage.substring(0, textProgressRef.current));
        // Pause slightly longer at sentence punctuation
        const char = fullBengaliMessage[textProgressRef.current - 1];
        const delay = char === '।' || char === '?' || char === '.' ? 700 : 50;
        synthTimerRef.current = window.setTimeout(tickText, delay);
      } else {
        // Finished typing
        stopAudio();
      }
    };

    tickText();
  };

  const stopAudio = () => {
    setIsPlaying(false);
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (visualizerTimerRef.current) {
      clearTimeout(visualizerTimerRef.current);
      visualizerTimerRef.current = null;
    }
    setVisualizerBars(new Array(18).fill(5));
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      const ctx = initAudio();
      if (!ctx) return;
      setIsPlaying(true);
      // Reset text states if they already finished
      if (textProgressRef.current >= fullBengaliMessage.length) {
        textProgressRef.current = 0;
        setTypedText('');
      }
      startAudio(ctx);
    }
  };

  const restartPlayback = () => {
    stopAudio();
    textProgressRef.current = 0;
    setTypedText('');
    setTimeout(() => {
      const ctx = initAudio();
      if (!ctx) return;
      setIsPlaying(true);
      startAudio(ctx);
    }, 150);
  };

  return (
    <section id="voice-message-section" className="py-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      
      {/* Sparkly circular blur panel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-pink-100 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        
        {/* Header Title */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100/60 rounded-full text-rose-500 text-xs font-mono border border-pink-200"
          >
            <Headphones className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>একটি রিয়েল-টাইম অনুভূতি</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mt-4 glowing-pink-text">
            স্পেশাল ভয়েস মেসেজ 🎧
          </h2>
          <p className="text-gray-500 font-sans text-sm md:text-base mt-2 max-w-sm mx-auto">
            তোমার জন্য লুকিয়ে রাখা একটি অনুভূতির সুর, আলতো করে ক্লিক করো...
          </p>
        </div>

        {/* Audio Console Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 25 }}
          className="glass-panel p-6 md:p-8 rounded-3xl shadow-xl border border-white/60 max-w-2xl mx-auto relative overflow-hidden"
        >
          {/* Glowing pulse ring in background of player */}
          {isPlaying && (
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-pink-300 via-rose-500 to-pink-300 animate-pulse"></div>
          )}

          <div className="flex flex-col items-center">
            
            {/* Visualizer bars */}
            <div className="h-16 flex items-center justify-center gap-1.5 w-full max-w-sm mb-8 px-4 border-b border-pink-100/40 pb-4">
              {visualizerBars.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: isPlaying ? val : 6 }}
                  className={`w-1.5 rounded-full ${
                    isPlaying 
                      ? 'bg-gradient-to-t from-pink-400 to-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' 
                      : 'bg-gray-300'
                  }`}
                  style={{ transformOrigin: 'bottom' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                />
              ))}
            </div>

            {/* Controller row */}
            <div className="flex items-center gap-5 justify-center mb-8">
              
              {/* Reset button element */}
              <button
                onClick={restartPlayback}
                disabled={typedText.length === 0}
                className="w-10 h-10 rounded-full bg-pink-100 text-rose-500 hover:bg-pink-200 transition-colors duration-300 flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="প্রথম থেকে শুনুন"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Main play pause button */}
              <button
                id="voice-play-pause"
                onClick={togglePlayback}
                className={`w-18 h-18 rounded-full flex items-center justify-center text-white scale-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer ${
                  isPlaying 
                    ? 'bg-rose-500 hover:bg-rose-600 glowing-pink-btn' 
                    : 'bg-pink-400 hover:bg-pink-500 glowing-pink-btn'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Glowing Heart indicator */}
              <div className="w-10 h-10 rounded-full bg-pink-100 text-rose-500 flex items-center justify-center">
                <Heart className={`w-5 h-5 ${isPlaying ? 'animate-bounce fill-pink-500' : 'opacity-60'}`} />
              </div>

            </div>

            {/* Play Button Text */}
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-6">
              {isPlaying ? 'মেসেজ বাজছে... 💌' : 'Play My Message For You 💌'}
            </p>

            {/* Typewritten message text layer */}
            <div className="w-full bg-white/60 rounded-2xl p-5 md:p-6 min-h-[140px] md:min-h-[160px] border border-pink-100 flex items-center justify-center shadow-inner relative">
              
              {/* Background watermark */}
              <div className="absolute inset-0 flex items-center justify-center text-pink-100/20 pointer-events-none select-none">
                <Heart className="w-40 h-40" fill="currentColor" />
              </div>

              <span className="font-serif text-pink-600 text-base md:text-lg leading-relaxed font-bold tracking-wide transition-all z-10 text-justify">
                {typedText.length > 0 ? (
                  typedText
                ) : (
                  <span className="text-gray-400 font-sans italic text-sm">
                    "মেসেজ প্লে করলেই এখানে আমার হৃদয়ের গোপন বার্তা টাইপ হতে শুরু করবে..."
                  </span>
                )}
                {isPlaying && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-1.5 h-5 bg-pink-500 ml-1 translate-y-0.5"
                  />
                )}
              </span>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
