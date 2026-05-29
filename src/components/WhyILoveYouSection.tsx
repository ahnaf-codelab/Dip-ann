import React from 'react';
import { motion } from 'motion/react';
import { Smile, HeartHandshake, ShieldAlert, Heart, Laugh, Sparkles } from 'lucide-react';
import { ReasonItem } from '../types';

const loveReasons: ReasonItem[] = [
  {
    id: 'smile',
    reason: 'তোমার মিষ্টি হাসিটা 😄',
    details: 'সারাদিনের ক্লান্তি বা যেকোনো হতাশা নিমেষেই মুছে যায় যখন আমি তোমার ঠোঁটের কোণে হাসি দেখি। তোমার এই হাসিটাই আমার বেঁচে থাকার সবচেয়ে বড় টনিক।',
    iconName: 'smile'
  },
  {
    id: 'care',
    reason: 'তোমার আগলে রাখার যত্ন 🌸',
    details: 'ছোট ছোট বিষয়ে তোমার শাসন, আমার শরীরের খবর নেওয়া আর সারাক্ষণ মায়ের মতো বাচ্চার মতো আগলে রাখাটা আমাকে এক পরম সুরক্ষা দেয়।',
    iconName: 'care'
  },
  {
    id: 'bad-times',
    reason: 'শত বিপদেও পাশে থাকা 🤝',
    details: 'পৃথিবী যখন আমার বিরুদ্ধে চলে যায়, তখনো আমি নির্দ্বিধায় জানি কেউ না থাকলেও তুমি চোখ বুজে আমার পাশে হাসিমুখে হাত ধরে দাঁড়িয়ে থাকবে।',
    iconName: 'handshake'
  },
  {
    id: 'cute-anger',
    reason: 'তোমার রাগটাও ভীষণ কিউট 😭',
    details: 'মুখ ফুলিয়ে যখন রাগ দেখাও, আমার যেন বুক ভরে ভালোবাসতে ইচ্ছে করে। তোমার সেই হালকা অভিমান ভেঙে আবার বুকে টেনে নেওয়ার অনুভূতি অতুলনীয়।',
    iconName: 'anger'
  },
  {
    id: 'silly',
    reason: 'তোমার পাগলামি আর ছেলেমানুষি 🤪',
    details: 'আমাদের একান্ত সময়ে তোমার বাচ্চাদের মতো কথা বলা, খুনসুটি আর অদ্ভুত সব কৌতুক আমার দুনিয়াতে মিষ্টি এক প্রশান্তি বয়ে আনে।',
    iconName: 'silly'
  },
  {
    id: 'future',
    reason: 'আমাদের সুন্দর এক ভবিষ্যতের স্বপ্ন 🏡',
    details: 'ভবিষ্যতের সুন্দর সাজানো সংসার, একসাথে কফিতে চুমুক, বৃষ্টি ভেজা বিকেল আর বুড়ো বয়সেও হাত ধরে পাশাপাশি বসে থাকার অপার ভরসা ও স্বপ্ন।',
    iconName: 'sparkles'
  }
];

const renderReasonIcon = (name: string) => {
  const classes = "w-7 h-7 text-rose-500 group-hover:scale-110 transition-transform duration-300";
  switch (name) {
    case 'smile': return <Smile className={classes} />;
    case 'care': return <Heart className={classes} fill="#fb7185" />;
    case 'handshake': return <HeartHandshake className={classes} />;
    case 'anger': return <ShieldAlert className={classes} />;
    case 'silly': return <Laugh className={classes} />;
    case 'sparkles': return <Sparkles className={classes} />;
    default: return <Heart className={classes} />;
  }
};

export default function WhyILoveYouSection() {
  return (
    <section id="why-love-section" className="py-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      
      {/* Absolute decorative back-drops */}
      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-1/4 -right-12 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-sans text-rose-400 bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200/50">হাজারো কারণের মাঝে কয়েকটি</span>
            <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mt-4 mb-3 glowing-pink-text">
              তোমাকে কেন এত ভালোবাসি 💕
            </h2>
            <p className="text-gray-500 font-sans text-sm md:text-base max-w-md mx-auto">
              শব্দ দিয়ে তো আর সব প্রকাশ করা যায় না, তবুও আমার মনের কিছু অনুুভূতি...
            </p>
          </motion.div>
        </div>

        {/* Reason Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loveReasons.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ 
                y: -6, 
                boxShadow: '0 20px 25px -5px rgba(244, 63, 94, 0.15)',
              }}
              className="glass-panel p-6 rounded-2xl border border-white/50 relative overflow-hidden group hover:bg-white/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cute top floating heart outline decorations */}
              <div className="absolute -right-4 -bottom-4 text-pink-100 opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500 pointer-events-none">
                <Heart className="w-20 h-20" fill="currentColor" />
              </div>

              <div>
                {/* Header icon row */}
                <div className="w-13 h-13 rounded-full bg-pink-150/50 flex items-center justify-center border border-pink-205/20 mb-5 shadow-inner">
                  {renderReasonIcon(item.iconName)}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-serif text-pink-600 font-bold mb-3">
                  {item.reason}
                </h3>

                {/* Details */}
                <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4">
                  {item.details}
                </p>
              </div>

              {/* Pretty decorative heart icon at the bottom */}
              <div className="flex justify-end pt-2">
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                  className="text-pink-400 select-none"
                >
                  ❤️
                </motion.span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
