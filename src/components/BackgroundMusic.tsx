import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synthInitialized, setSynthInitialized] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Simple romantic chord progression: Cmaj9 -> Am9 -> Fmaj7 -> G6
  const chords = [
    [130.81, 196.00, 261.63, 329.63, 392.00, 493.88], // C3, G3, C4, E4, G4, B4
    [110.00, 164.81, 220.00, 261.63, 329.63, 440.00], // A2, E3, A3, C4, E4, A4
    [87.31,  130.81, 174.61, 218.27, 261.63, 329.63], // F2, C3, F3, A3, C4, E4
    [98.00,  146.83, 196.00, 246.94, 293.66, 392.00], // G2, D3, G3, B3, D4, G4
  ];

  const triggerNote = (ctx: AudioContext, frequency: number, startTime: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Reverb/delay simulation nodes
    const delay = ctx.createDelay();
    const delayGain = ctx.createGain();

    osc.type = 'triangle'; // Soft flute/piano-like tone
    osc.frequency.setValueAtTime(frequency, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, startTime); // Warm tone cut-off

    gainNode.gain.setValueAtTime(0, startTime);
    // Slow Attack
    gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.1);
    // Soft decay & long release
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // Dynamic delay path for dreamy, spatial reverb feedback
    delay.delayTime.setValueAtTime(0.4, startTime);
    delayGain.gain.setValueAtTime(0.3, startTime);

    // Sound routing
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Dreamy echo effect loop
    gainNode.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(ctx.destination);
    delayGain.connect(delay); // Feedback

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const playSequence = () => {
    if (!audioCtxRef.current || !isPlayingRef.current) return;
    const ctx = audioCtxRef.current;

    let now = ctx.currentTime;
    let chordIndex = 0;
    
    const tick = () => {
      if (!isPlayingRef.current) return;
      
      const currentChord = chords[chordIndex];
      // Play a soft arpeggio
      currentChord.forEach((freq, index) => {
        // Stagger notes inside arpeggio
        const noteTime = now + index * 0.25;
        // High melody tone variation helper
        triggerNote(ctx, freq, noteTime, 3.5);
      });

      // Advance to next bar
      chordIndex = (chordIndex + 1) % chords.length;
      now += 4.5; // Seconds per bar in the progress

      // Schedule next bar
      const timeToNext = (now - ctx.currentTime) * 1000;
      timerRef.current = window.setTimeout(tick, Math.max(timeToNext, 2500));
    };

    // Begin sequence
    tick();
  };

  const initAudio = () => {
    if (synthInitialized) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;
      setSynthInitialized(true);
    } catch (e) {
      console.error("Audio Context failed to load", e);
    }
  };

  const toggleMusic = () => {
    initAudio();

    setTimeout(() => {
      if (!audioCtxRef.current) return;

      if (isPlaying) {
        // Stop current playbacks
        isPlayingRef.current = false;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setIsPlaying(false);
      } else {
        // Play
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        isPlayingRef.current = true;
        setIsPlaying(true);
        playSequence();
      }
    }, 50);
  };

  // Autoplay attempt on first user interaction with document
  useEffect(() => {
    const handleInteraction = () => {
      if (!synthInitialized) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;
        setSynthInitialized(true);
        
        ctx.resume().then(() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
          playSequence();
        });
      }
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      cleanup();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [synthInitialized]);

  // Clean-up loop on unmount
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating Status Box */}
      <div className={`glass-panel rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition-all duration-500 border border-pink-200/50 ${isPlaying ? 'opacity-100 translate-x-0' : 'opacity-80 translate-x-2'}`}>
        {isPlaying ? (
          <span className="flex items-center gap-1.5 text-xs text-rose-500 font-sans tracking-wide">
            <Disc className="w-4.5 h-4.5 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="animate-pulse-slow">সুর বাজছে... 🎶</span>
          </span>
        ) : (
          <span className="text-xs text-gray-500 font-sans">সুর বন্ধ 🔇</span>
        )}
      </div>

      {/* Main trigger button */}
      <button
        id="bg-music-toggle"
        onClick={toggleMusic}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 scale-100 hover:scale-110 active:scale-95 shadow-md flex-shrink-0 cursor-pointer ${
          isPlaying 
            ? 'bg-rose-500 hover:bg-rose-600 glowing-pink-btn' 
            : 'bg-gray-400 hover:bg-gray-500'
        }`}
        title={isPlaying ? "সুর বন্ধ করুন" : "মিষ্টি সুর শুনুন"}
      >
        {isPlaying ? (
          <Volume2 className="w-5.5 h-5.5 animate-pulse" />
        ) : (
          <VolumeX className="w-5.5 h-5.5" />
        )}
      </button>
    </div>
  );
}
