import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface WishID {
  id: string;
  name: string;
  username: string;
  initials: string;
  message: string;
  time: string;
  initialLikes: number;
  gradient: string;
}

const initialWishes: WishID[] = [
  {
    id: 'wish-1',
    name: 'Ahnaf Sharier',
    username: 'ahnaf_sharier',
    initials: 'AS',
    message: 'শুভ ৪র্থ বার্ষিকী ভাইয়া ও আপু! তোমােরদের কিউট জুটিটা যেন এভাবেই আজীবন হাসিখুশি আর অফুরন্ত ভালোবাসায় মেতে থাকে। যুগ যুগ ধরে যুগলবন্দী হয়ে থেকো, হৃদয় নিংড়ানো অভিনন্দন তোমাদের জন্য! 🎉❤️',
    time: 'আজ, বিকাল ০৫:২০ মিনিট',
    initialLikes: 238,
    gradient: 'from-blue-500 to-indigo-600 shadow-blue-200'
  },
  {
    id: 'wish-2',
    name: 'OVI RAHMAN',
    username: 'ovi_rahman',
    initials: 'OR',
    message: 'তোমাদের ৪ বছরের পথচলা অত্যন্ত কিউট আর সত্যিই চমৎকার উদাহরণ! মনের পঙ্কিলতা ছুড়ে ফেলে ৪ বছর তো কেবল শুরু, পরম সৃষ্টিকর্তার আশীর্বাদে কোটি বছর এই মিলন অটুট সুখে কেটে যাক। অভিনন্দন! 💕✨',
    time: 'আজ, বিকাল ০৪:৪৫ মিনিট',
    initialLikes: 312,
    gradient: 'from-pink-500 to-rose-600 shadow-pink-200'
  },
  {
    id: 'wish-3',
    name: 'RIFATH RAYAN',
    username: 'rifath_rayan',
    initials: 'RR',
    message: 'আমাদের ভালোবাসার প্রিয়তম জুটিকে জানাই উষ্ণ ও আন্তরিক বার্ষিকী শুভেচ্ছা! প্রতিটি চড়াই-উতরাই ও মধুর মূহূর্তগুলোতে তোমরা যেভাবে পরস্পরের হাত পরম যত্নে আগলে রেখেছো, তা সত্যিই দৃষ্টান্তমূলক। শুভ ৪ বছর পথচলা! 👑🌟',
    time: 'আজ, দুপুর ১২:১৫ মিনিট',
    initialLikes: 274,
    gradient: 'from-emerald-500 to-teal-600 shadow-emerald-200'
  },
  {
    id: 'wish-4',
    name: 'ROBIUL ISLAM',
    username: 'robiul_islam',
    initials: 'RI',
    message: 'হ্যাপি ৪র্থ অ্যানিভার্সারি প্রিয় ভাইয়া ও আপু! সবসময় এভাবেই সুন্দর মিষ্টি খুনসুটি, শুভ ভালোবাসা আর মধুর আন্তরিকতায় রঙিন থাকুক তোমাদের আগামী প্রতিটি দিন। এভাবেই চিরকাল একসাথে হাসিমুখে এগিয়ে যাও! 🎂🌸',
    time: 'আজ, সকাল ০৯:৩০ মিনিট',
    initialLikes: 385,
    gradient: 'from-purple-500 to-fuchsia-600 shadow-purple-200'
  }
];

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishID[]>(initialWishes);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter(item => item !== id));
      setWishes(prev => prev.map(w => w.id === id ? { ...w, initialLikes: w.initialLikes - 1 } : w));
    } else {
      setLikedIds([...likedIds, id]);
      setWishes(prev => prev.map(w => w.id === id ? { ...w, initialLikes: w.initialLikes + 1 } : w));
    }
  };

  return (
    <section id="anniversary-wishes" className="py-16 md:py-20 relative overflow-hidden bg-rose-50/20">
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 left-10 w-44 h-44 bg-pink-200 rounded-full blur-[80px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-52 h-52 bg-purple-200 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-500 bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200">
              শুভেচ্ছা ও অভিনন্দন বার্তা 💌
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-extrabold mt-4 mb-2 glowing-pink-text">
              শুভানুধ্যায়ীদের শুভকামনা 💖
            </h2>
            <p className="text-gray-500 font-sans text-sm md:text-base max-w-lg mx-auto">
              ৪র্থ সম্পর্ক বার্ষিকী উপলক্ষে পাঠানো ৪টি বিশেষ শুভেচ্ছা আইডি এবং অভিনন্দন বার্তা।
            </p>
          </motion.div>
        </div>

        {/* 4 Beautiful Profile cards in 2x2 grid */}
        <div id="wishes-display-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {wishes.map((wish, index) => {
            const isLiked = likedIds.includes(wish.id);
            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                id={`wish-profile-card-${wish.id}`}
                className="glass-panel p-6 rounded-3xl border border-white/70 shadow-lg relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background pulse highlight */}
                <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-pink-200/10 rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Card Header (Profile & Username) */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      {/* Active Status Ring */}
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-10" />
                      {/* Initials-based profile avatar instead of picture */}
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${wish.gradient} flex items-center justify-center text-white font-mono font-bold text-lg shadow-md border border-white/40 transform hover:rotate-6 transition-transform`}>
                        {wish.initials}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif font-bold text-gray-800 text-base md:text-lg">
                          {wish.name}
                        </h4>
                        <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow" title="Verified Wish Channel">
                          ✓
                        </span>
                      </div>
                      <p className="text-xs font-mono text-gray-400">
                        @{wish.username}
                      </p>
                    </div>
                  </div>

                  {/* Comment / Wish message */}
                  <p className="text-sm font-sans text-gray-700 leading-relaxed text-justify mb-5 pl-1 italic">
                    "{wish.message}"
                  </p>
                </div>

                {/* Card Footer Interaction Bar */}
                <div className="flex items-center justify-between border-t border-rose-200/40 pt-4 mt-auto">
                  <span className="text-[10px] text-gray-400 font-mono">
                    {wish.time}
                  </span>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 1.3 }}
                      onClick={() => handleLike(wish.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isLiked 
                          ? 'bg-rose-500 text-white shadow-rose-300 shadow' 
                          : 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current animate-pulse' : ''}`} />
                      <span>{wish.initialLikes}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
