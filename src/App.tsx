/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Home, 
  Sparkles, 
  Compass, 
  Info, 
  Flame, 
  Smile, 
  X, 
  Award,
  Menu,
  ChevronDown
} from 'lucide-react';

// Custom Parts
import BackgroundMusic from './components/BackgroundMusic';
import InteractiveHearts from './components/InteractiveHearts';
import TimelineSection from './components/TimelineSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import WhyILoveYouSection from './components/WhyILoveYouSection';
import VoiceMessageSection from './components/VoiceMessageSection';
import CakeSection from './components/CakeSection';
import ProposalSection from './components/ProposalSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  
  // Custom Names (Dip & Sraboni default)
  const [maleName, setMaleName] = useState(() => {
    const saved = localStorage.getItem('maleName');
    if (!saved || saved === 'আহনাফ') return 'দীপ';
    return saved;
  });
  const [femaleName, setFemaleName] = useState(() => {
    const saved = localStorage.getItem('femaleName');
    if (!saved || saved === 'জান্নাত') return 'শ্রাবণী';
    return saved;
  });
  const [isEditingNames, setIsEditingNames] = useState(false);

  // Love Timer counts
  const [timeElapsed, setTimeElapsed] = useState({
    years: 4,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Secret popup trigger
  const [showSecretModal, setShowSecretModal] = useState(false);

  // First Letter typing state
  const [letterTypedText, setLetterTypedText] = useState('');
  const fullFirstLetter = "চার বছর আগে তোমাকে পাওয়ার পর আমার জীবনটা অন্যরকম সুন্দর হয়ে গেছে। যখন তোমার ওই মায়াবী চোখের দিকে প্রথম তাকিয়েছিলাম, তখনো ভাবিনি এই হাত আর কখনো ছাড়তে ইচ্ছে করবে না। ৪ বছরের এই পথচলায় আমাদের কত সহস্র স্মৃতি, কত গভীর মান-অভিমান আর দিনশেষে বুকে জড়িয়ে ধরে সব ভুলে যাওয়ার সেই পরম শান্তি। প্রতিটি কঠিন সময়ে তুমি যেভাবে আমার বিশ্বাসের খুঁটি হয়ে পাশে দাঁড়িয়েছিলে, তা আমার জীবনকে কানায় কানায় সার্থক করেছে। ধন্যবাদ সোনা, আমার জীবনে আসা প্রতিটি খুশির মুহূর্তের একমাত্র কারণ হওয়ার জন্য। এভাবেই আজীবন তোমার পাশে হাসি দেখতে চাই... 💖";

  useEffect(() => {
    // Fade loading spinner in 1.3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  // Sync state variables to localStorage
  const saveNames = () => {
    localStorage.setItem('maleName', maleName);
    localStorage.setItem('femaleName', femaleName);
    setIsEditingNames(false);
  };

  // Live timer tick since May 29, 2022
  useEffect(() => {
    const startDate = new Date('2022-05-29T00:00:00+06:00'); // Relationship foundation date

    const updateTimer = () => {
      const now = new Date();
      const diffMs = Math.abs(now.getTime() - startDate.getTime());

      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHrs = Math.floor(diffMins / 60);
      const diffPluralDays = Math.floor(diffHrs / 24);

      // Real calculation
      const years = Math.floor(diffPluralDays / 365);
      const remainingDays = diffPluralDays % 365;
      const months = Math.floor(remainingDays / 30);
      const days = remainingDays % 30;

      const hours = diffHrs % 24;
      const minutes = diffMins % 60;
      const seconds = diffSecs % 60;

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple typing animation of first letter when open
  useEffect(() => {
    if (!isOpened) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < fullFirstLetter.length) {
        idx += 1;
        setLetterTypedText(fullFirstLetter.substring(0, idx));
      } else {
        clearInterval(interval);
      }
    }, 45); // Typing speed
    return () => clearInterval(interval);
  }, [isOpened]);

  return (
    <div className="font-sans antialiased text-pink-950 min-h-screen relative bg-[#FFF0F3] select-none pb-12 overflow-x-hidden no-scrollbar">
      
      {/* Background Mesh Gradients as requested in Frosted Glass theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-pulse-slow"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-75"></div>
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-rose-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-55"></div>
        {/* Floating Theme Decorations from design */}
        <div className="absolute top-1/4 left-10 text-rose-300 opacity-40 text-4xl animate-float">🌸</div>
        <div className="absolute bottom-20 left-1/2 text-rose-300 opacity-30 text-6xl animate-float" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute top-[60%] right-10 text-rose-300 opacity-45 text-2xl animate-pulse">✨</div>
      </div>

      {/* Dynamic Cursor Heart trail plus rising hearts */}
      <InteractiveHearts />

      {/* Globally Float Background Music Synthesizer */}
      <BackgroundMusic />

      {/* TOP HEADER ADJUST NAMES WIDGET */}
      <nav className="fixed top-4 left-4 right-4 z-40 max-w-md mx-auto flex items-center justify-center glass-panel px-5 py-3 rounded-full border border-white/50 shadow-md">
        <div className="flex items-center gap-1.5 font-serif text-pink-600 font-extrabold text-sm md:text-base">
          <Heart className="w-5 h-5 text-rose-500 animate-pulse fill-rose-500" />
          <span>{maleName} 💖 {femaleName}</span>
        </div>
      </nav>

      {/* INTRODUCING LOVELY LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            id="loading-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-pink-50 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.25, 1], rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center border-2 border-pink-300 shadow-md"
              >
                <Heart className="w-12 h-12 text-rose-500 fill-rose-400" />
              </motion.div>
              {/* Pulsing visual circles */}
              <div className="absolute inset-0 max-w-full rounded-full border border-rose-300 animate-ping opacity-60"></div>
            </div>
            
            <h3 className="text-xl font-serif text-pink-600 mt-6 font-bold glowing-pink-text animate-pulse">
              আমাদের অনুভূতিগুলো সাজানো হচ্ছে... 💖
            </h3>
            <p className="text-xs text-gray-400 font-sans mt-2">
              দয়া করে এক মূহূর্ত অপেক্ষা করো জান!
            </p>
          </motion.div>
        )}
      </AnimatePresence>


      {/* SECTION 1 - OPENING SCREEN (ENVELOPE INTRO CARD) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            id="opening-envelope"
            exit={{ opacity: 0, y: -80, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-gradient-to-b from-pink-100 via-rose-200 to-pink-200 flex items-center justify-center p-4 z-30"
          >
            {/* Soft floating particles backdrops */}
            <div className="absolute top-10 left-10 w-36 h-36 bg-pink-300/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-44 h-44 bg-rose-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="text-center w-full max-w-lg px-2">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Vintage Wax Seal decoration */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-500/10 rounded-full blur-xl pointer-events-none"></div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-16 h-16 bg-white/80 rounded-full border border-pink-200 shadow flex items-center justify-center mx-auto mb-6 text-3xl"
                >
                  ✉️
                </motion.div>

                {/* Main Titles */}
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 bg-pink-100 px-3 py-1 rounded-full">৪র্থ রিলেশন অ্যানিভার্সারি</span>
                
                <h1 className="text-3xl md:text-5xl font-serif text-pink-600 mt-5 mb-3 font-extrabold glowing-pink-text leading-tight">
                  {maleName} 💖 {femaleName}
                </h1>

                {/* Subtitle text */}
                <p className="text-gray-500 font-sans text-sm md:text-base mb-8 italic">
                  “আমাদের ভালোবাসার সেই চার স্বপ্নীল বছর...”
                </p>

                {/* Wax seal stylized button */}
                <motion.button
                  id="open-story-btn"
                  onClick={() => setIsOpened(true)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-serif font-bold text-base md:text-lg shadow-lg hover:shadow-pink-400/50 cursor-pointer glowing-pink-btn flex items-center justify-center gap-2 mx-auto"
                >
                  <span>Tap To Open Our Love Story 💖</span>
                </motion.button>

                <p className="text-[10px] text-rose-400/85 font-mono mt-4">
                  * মিউজিক চালু রাখতে ইয়ারফোন ব্যবহার করতে পারো
                </p>

              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* MAIN WEBSITE SECTIONS WRAPPER */}
      {isOpened && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="container mx-auto px-4 md:px-0 pt-24"
        >

          {/* SECTION 2 — FIRST LOVE LETTER ✉️ */}
          <section id="first-letter" className="py-12 md:py-16 max-w-3xl mx-auto px-2">
            
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-[url('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=50')] bg-cover bg-center p-0 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden relative border border-rose-200"
            >
              
              {/* Paper overlay styling mask */}
              <div className="absolute inset-0 bg-yellow-50/93 mix-blend-multiply rounded-2xl md:rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-bl from-pink-100/30 to-rose-100/10 rounded-2xl md:rounded-3xl" />

              <div className="relative z-15 p-6 md:p-10 min-h-[300px] flex flex-col justify-between">
                
                {/* Wax seal heart icon corner decoration */}
                <div className="absolute top-5 right-5 text-rose-300 opacity-60">
                  <Heart className="w-10 h-10 fill-current" />
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-rose-500 bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200/50">ভালোবাসার প্রথম চিরকুট</span>
                  
                  {/* Typed letter text */}
                  <div className="mt-6 md:mt-8 font-serif text-gray-800 text-lg md:text-xl leading-relaxed text-justify relative min-h-[160px]">
                    <p className="font-bold tracking-wide">
                      {letterTypedText}
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ repeat: Infinity, duration: 0.9 }}
                        className="inline-block w-1.5 h-5 bg-pink-500 ml-1 translate-y-0.5"
                      />
                    </p>
                  </div>
                </div>

                {/* Bottom signing stamp */}
                <div className="mt-8 flex justify-end border-t border-rose-300/30 pt-4">
                  <div className="text-right">
                    <p className="text-[11px] font-sans text-gray-500">ইতি,</p>
                    <p className="font-serif text-pink-600 font-extrabold text-base md:text-lg tracking-wide">
                      তোমার প্রিয় মুখ 🌸
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>

          </section>


          {/* SECTION 3 — LOVE TIMER ⏳ */}
          <section id="love-timer" className="py-16 md:py-20 relative overflow-hidden text-center">
            
            {/* Blur circle pink backdrop */}
            <div className="absolute top-1/2 left-1/2 -track-x-1/2 w-64 h-64 bg-pink-200 rounded-full blur-[80px] opacity-35 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-500 bg-rose-100 px-3.5 py-1.5 rounded-full">সম্পর্কের বন্ধন কতদিনের?</span>
                <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mt-4 mb-2 glowing-pink-text">
                  আমাদের একসাথে পথচলা ⏳💖
                </h2>
                <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto mb-10">
                  ২৯ মে, ২০২২ থেকে প্রতিটি মুহূর্ত মধুর মায়ায় জড়িয়ে থাকার সেকেন্ডের লাইভ হিসাব
                </p>
              </motion.div>

              {/* Glowing countdown cards */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 max-w-3xl mx-auto">
                
                {/* Year Counter Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="glass-panel p-4 md:p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl font-serif font-extrabold text-pink-600 glowing-pink-text">
                    {timeElapsed.years}
                  </span>
                  <span className="text-xs font-sans text-gray-500 mt-1">Years</span>
                  <span className="text-[10px] text-rose-400 mt-0.5">বছর 🌸</span>
                </motion.div>

                {/* Month Counter Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="glass-panel p-4 md:p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl font-serif font-extrabold text-pink-600 glowing-pink-text">
                    {timeElapsed.months}
                  </span>
                  <span className="text-xs font-sans text-gray-500 mt-1">Months</span>
                  <span className="text-[10px] text-rose-400 mt-0.5">মাস🌙</span>
                </motion.div>

                {/* Day Counter Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="glass-panel p-4 md:p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl font-serif font-extrabold text-pink-600 glowing-pink-text">
                    {timeElapsed.days}
                  </span>
                  <span className="text-xs font-sans text-gray-500 mt-1">Days</span>
                  <span className="text-[10px] text-rose-400 mt-0.5">দিন ☀️</span>
                </motion.div>

                {/* Hours Counter Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="glass-panel p-4 md:p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl font-serif font-extrabold text-pink-600 glowing-pink-text">
                    {timeElapsed.hours}
                  </span>
                  <span className="text-xs font-sans text-gray-500 mt-1">Hours</span>
                  <span className="text-[10px] text-rose-400 mt-0.5">ঘণ্টা ⏰</span>
                </motion.div>

                {/* Minutes Counter Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="glass-panel p-4 md:p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl font-serif font-extrabold text-pink-600 glowing-pink-text">
                    {timeElapsed.minutes}
                  </span>
                  <span className="text-xs font-sans text-gray-500 mt-1">Minutes</span>
                  <span className="text-[10px] text-rose-400 mt-0.5">মিনিট ⏳</span>
                </motion.div>

                {/* Seconds Counter Card */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="glass-panel p-4 md:p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center col-span-2 md:col-span-1 bg-pink-100/20"
                >
                  <span className="text-3xl md:text-4xl font-serif font-extrabold text-rose-500 glowing-pink-text animate-pulse">
                    {timeElapsed.seconds}
                  </span>
                  <span className="text-xs font-sans text-gray-500 mt-1">Seconds</span>
                  <span className="text-[10px] text-rose-500 mt-0.5 font-bold animate-bounce">সেকেন্ড ❤️</span>
                </motion.div>

              </div>

            </div>

          </section>


          {/* SECTION 5 — LOVE STORY TIMELINE 🕰️ */}
          <TimelineSection />


          {/* SECTION 4 — PHOTO GALLERY 📸 */}
          <PhotoGallerySection />


          {/* SECTION 6 — WHY I LOVE YOU 💗 */}
          <WhyILoveYouSection />


          {/* SECTION 7 — VOICE MESSAGE 🎧 */}
          <VoiceMessageSection />


          {/* SECTION 8 — ANNIVERSARY CAKE 🎂 */}
          <CakeSection />


          {/* SECTION 9 — FUTURE DREAMS 🌍 */}
          <section id="future-dreams" className="py-20 px-4 md:px-8 relative overflow-hidden bg-white/10">
            <div className="max-w-5xl mx-auto">
              
              {/* Header Titles */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm font-sans text-rose-400 bg-pink-100 px-4 py-1 rounded-full border border-pink-200">আজ থেকে আগামী দিনে</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-extrabold mt-4 mb-2 glowing-pink-text">
                    আমাদের স্বপ্নগুলো 🌍✈️
                  </h2>
                  <p className="text-gray-500 font-sans text-sm md:text-base max-w-md mx-auto">
                    দুজনে একসাথে বুড়ো হওয়ার এই যাত্রায় কতটুকু স্বপ্ন ছুঁয়ে দেখতে চাই আমরা!
                  </p>
                </motion.div>
              </div>

              {/* Dreams Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                
                {/* Dream 1: Travelling Together */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-panel p-6 rounded-2xl border border-white/60 shadow-md text-center group flex flex-col justify-between h-72"
                >
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">✈️</div>
                    <h3 className="text-lg md:text-xl font-serif text-pink-600 font-bold mb-3">Travelling Together</h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      হাতে হাত রেখে পুরো পৃথিবীর অলিগলি ঘুরে বেড়াবো। আইফেল টাওয়ারের নিচে পাশে দাঁড়িয়ে চোখ জোড়ায় হারিয়ে যাবো।
                    </p>
                  </div>
                  <span className="text-[10px] font-sans text-pink-400 font-bold mt-4 block">ঘুরতে যাওয়া 🗺️</span>
                </motion.div>

                {/* Dream 2: Future Home */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-panel p-6 rounded-2xl border border-white/60 shadow-md text-center group flex flex-col justify-between h-72"
                >
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">🏡</div>
                    <h3 className="text-lg md:text-xl font-serif text-pink-600 font-bold mb-3">Future Home</h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      আমাদের একটা ছোট্ট মিষ্টি সাজানো কুটির থাকবে। বারান্দায় থাকবে সারি সারি টবে রঙিন বেলী ফুল আর ক্যাকটাস।
                    </p>
                  </div>
                  <span className="text-[10px] font-sans text-pink-400 font-bold mt-4 block">ছোট্ট বাসা 🌸</span>
                </motion.div>

                {/* Dream 3: Marriage */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-panel p-6 rounded-2xl border border-white/60 shadow-md text-center group flex flex-col justify-between h-72"
                >
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">💍</div>
                    <h3 className="text-lg md:text-xl font-serif text-pink-600 font-bold mb-3">Marriage Celebration</h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      লাল বেনারসীতে জড়িয়ে শত মানুষের সামনে তোমাকে আমার নিজের করে ঘরে তোলার সেই শুভ শুভ ক্ষণ।
                    </p>
                  </div>
                  <span className="text-[10px] font-sans text-pink-400 font-bold mt-4 block">শুভ পরিণয় 💍</span>
                </motion.div>

                {/* Dream 4: Forever Together */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-panel p-6 rounded-2xl border border-white/60 shadow-md text-center group flex flex-col justify-between h-72"
                >
                  <div>
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">💖</div>
                    <h3 className="text-lg md:text-xl font-serif text-pink-600 font-bold mb-3">Forever Together</h3>
                    <p className="text-xs text-gray-600 font-sans leading-relaxed">
                      বয়সের ভারে নুয়ে যাওয়া দিনগুলোতেও তোমার কাঁপতে থাকা আঙ্গুলগুলো আমার বৃদ্ধ বুকের পাঁজর ছুঁয়ে থাকবে।
                    </p>
                  </div>
                  <span className="text-[10px] font-sans text-pink-400 font-bold mt-4 block">অনন্তকাল ⌛</span>
                </motion.div>

              </div>

            </div>
          </section>


          {/* SECTION 10 — SECRET MESSAGE 👀 (HIDDEN CUTE BUTTON) */}
          <section id="secret-message" className="py-12 relative text-center">
            
            <div className="max-w-md mx-auto px-4">
              
              <div className="p-4 bg-pink-100/20 border border-dashed border-rose-300 rounded-3xl inline-block">
                <span className="text-xs font-sans text-gray-500 mr-2.5">এখানে একটি গোপন বাটন আছে... 👀</span>
                
                <button
                  id="secret-do-not-click-btn"
                  onClick={() => setShowSecretModal(true)}
                  className="px-4 py-2 bg-rose-400 text-white rounded-full text-xs font-bold shadow hover:bg-rose-500 cursor-pointer transition-colors"
                >
                  Do Not Click 😭
                </button>
              </div>

            </div>

            {/* Secret funny romantic Popup Modal */}
            <AnimatePresence>
              {showSecretModal && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                  onClick={() => setShowSecretModal(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.85, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.85, y: 30 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="bg-white p-6 md:p-8 max-w-md w-full rounded-3xl shadow-2xl relative overflow-hidden text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Cute funny emoji inside header */}
                    <div className="text-5xl animate-[bounce_1.5s_infinite] mb-4">
                      😜 💕 🍫
                    </div>

                    <h3 className="font-serif text-pink-600 text-2xl font-extrabold mb-3">
                      ধরা খেয়েছ তুমি! 🙈
                    </h3>

                    <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed mb-6">
                      "না করার পরেও ক্লিক করেছ! এখন তোমাকে শাস্তি হিসেবে আমাদের এই ৪র্থ রিলেশন অ্যানিভার্সারিতে আমাকে অনেক অনেক ডেইরি মিল্ক চকলেট অথবা সুস্বাদু ফালুদা খাওয়াতে হবে! নো এক্সকিউজ, জান! ডিল ইজ ডিল! 😭🍫🍦"
                    </p>

                    <p className="text-xs text-rose-450 italic bg-rose-50 p-2.5 rounded-xl border border-rose-100 mb-6">
                      * বাটন বন্ধ করার আগে চকলেট খাওয়ানোর প্রমিস করতে হবে!
                    </p>

                    {/* Fun buttons inside secret */}
                    <div className="flex flex-col gap-2.5">
                      <button
                        onClick={() => setShowSecretModal(false)}
                        className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-bold shadow-md cursor-pointer"
                      >
                        প্রমিস করছি, চকলেট খাওয়াবো! 🙋‍♀️🍫
                      </button>
                      <button
                        onClick={() => alert("ধুরর! এত সহজে রেহাই পাবে না জান! চকলেট খাওয়াতেই হবে! 🤪")}
                        className="px-6 py-2 bg-gray-200 text-gray-600 text-xs rounded-full hover:bg-gray-300 cursor-pointer"
                      >
                        প্রমিস করলাম না 😜
                      </button>
                    </div>

                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </section>


          {/* SECTION 11 — PROPOSAL SECTION 💍 */}
          <ProposalSection />


          {/* SECTION 12 — FINAL LETTER (CINEMATIC ENDING) 🌸 */}
          <section id="final-cinematic-ending" className="py-24 text-center relative overflow-hidden">
            
            {/* Spinning background light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-100 rounded-full blur-[80px] opacity-25 pointer-events-none"></div>

            <div className="max-w-3xl mx-auto px-4 relative z-10">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center justify-center"
              >
                {/* Decorative heart loop */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.25, 1],
                    rotate: [0, 8, -8, 0] 
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="mb-8 select-none"
                >
                  <span className="text-6xl text-rose-500 drop-shadow filter">❤️</span>
                </motion.div>

                {/* Main Ending Quote banner */}
                <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-extrabold max-w-xl mx-auto leading-relaxed glowing-pink-text mb-4">
                  And This Is Just The Beginning Of Our Forever 💖
                </h2>

                <p className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 mb-8 bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200">
                  ৪ বছরের পথচলা পেরিয়ে অন্তহীন চিরকালের পথে...
                </p>

                {/* Names displays */}
                <div className="font-serif text-gray-700 text-2xl md:text-3xl font-extrabold flex items-center gap-3 justify-center mb-16">
                  <span>{maleName}</span>
                  <span className="text-rose-500 fill-rose-400 animate-pulse text-xl">💝</span>
                  <span>{femaleName}</span>
                </div>

                {/* Subfooter clean credentials lines */}
                <div className="border-t border-rose-200/50 pt-8 w-full max-w-md">
                  <p className="text-xs text-gray-400 font-sans tracking-wide">
                    আমাদের সুন্দর স্মৃতিগুলো সবসময় অম্লান থাকবে
                  </p>
                  <p className="text-[10px] text-pink-400 font-serif font-bold tracking-widest mt-1.5 uppercase">
                    Crafted with endless love & devotion 💖
                  </p>
                </div>

              </motion.div>

            </div>

          </section>

        </motion.main>
      )}

    </div>
  );
}
