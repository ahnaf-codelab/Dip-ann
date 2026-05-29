import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart, Compass, ShieldAlert, Sparkles, Star } from 'lucide-react';
import { TimelineEvent } from '../types';

const timelineEvents: TimelineEvent[] = [
  {
    id: 'meet',
    title: 'প্রথম দেখা 🌸',
    date: 'মে ৩০, ২০২২',
    description: 'মনে পড়ে সেই প্রথম দিনের কথা? এক বুক জড়তা আর হাজারো মিষ্টি অনুভূতির সেই সূচনা। প্রথম যখন তোমার চোখে চোখ পড়েছিল, চারপাশের সবকিছু যেন এক মুহূর্তের জন্য থমকে গিয়েছিল।',
    image: 'https://i.ibb.co.com/3yH1FpSM/Whats-App-Image-2026-05-29-at-10-44-04-AM.jpg',
    icon: 'heart'
  },
  {
    id: 'date',
    title: 'দ্বিতীয় দেখা ☕',
    date: 'জুলাই ১৫, ২০২২',
    description: 'হাতে হাত রেখে পাশাপাশি বসে থাকার আনন্দ। কফির কাপে চুমুক দিতে দিতে আমাদের অনন্ত গল্প আর অপলক তাকিয়ে থাকা। সেই দিনই বুঝতে পেরেছিলাম, এই মানুষটি ছাড়া আমার আর কাউকে চাই না।',
    image: 'https://i.ibb.co.com/kgYbWTxp/Whats-App-Image-2026-05-29-at-10-51-10-AM.jpg',
    icon: 'calendar'
  },
  {
    id: 'tough',
    title: 'সবচেয়ে সুন্দর মুহূর্ত ✨',
    date: '১২ অক্টোবর, ২০২৩',
    description: 'জীবনের সেরা মূহূর্তগুলোর একটি, যা চিরকাল আমাদের মনে গেঁথে থাকবে। তোমার প্রতিটি হাসিতে, প্রতিটি চাহনিতে আমাদের ভালোবাসার পূর্ণতা প্রকাশ পায়।',
    image: 'https://i.ibb.co.com/Z1h7vqvz/Whats-App-Image-2026-05-29-at-10-21-11-AM.jpg',
    icon: 'heart'
  },
  {
    id: 'stronger',
    title: 'একসাথে হাজারো হাসি 😄',
    date: '০৪ মার্চ, ২০২৪',
    description: 'আমাদের প্রতিটি আনন্দের মুহূর্ত, প্রতিটা আড্ডা ও একরাশ অনাবিল হাসি। তোমার এই সুন্দর হাসিটাই আমার ভালো থাকার সবচেয়ে বড় নিয়ামক।',
    image: 'https://i.ibb.co.com/3b6160d/Whats-App-Image-2026-05-29-at-9-28-59-AM.jpg',
    icon: 'sparkles'
  },
  {
    id: 'tour',
    title: 'ছোট ছোট খুনসুটি 🙈',
    date: '১৯ আগস্ট, ২০২৫',
    description: 'আমাদের সেই মিষ্টি ঝগড়া, মান-অভিমান আর খুনসুটিগুলো যা ছাড়া আমাদের ভালোবাসা অপূর্ণ। একে অপরকে রাগানো আর তারপরেই জড়িয়ে ধরার অনুভূতিটাই অন্যরকম।',
    image: 'https://i.ibb.co.com/twpqzP3c/Whats-App-Image-2026-05-29-at-9-29-00-AM.jpg',
    icon: 'compass'
  },
  {
    id: 'anniversary',
    title: '৪ বছরের মধুর পথচলা 🎉',
    date: 'আজকের এই শুভ দিন',
    description: '৪ বছরের হাজারো হাসি, কান্না, মান-অভিমান আর একরাশ ভালোবাসায় ঘেরা স্বপ্নিল যাত্রা। হাজার বছরের ভালোবাসার চেয়েও আমাদের এই চার বছর অনেক বেশি অর্থপূর্ণ আর স্পেশাল।',
    image: 'https://i.ibb.co.com/Hpz9Pm1z/Whats-App-Image-2026-05-29-at-9-28-59-AM-1.jpg',
    icon: 'star'
  }
];

const renderIcon = (iconName: string) => {
  const classes = "w-6 h-6 text-rose-500";
  switch (iconName) {
    case 'heart': return <Heart className={classes} fill="#f43f5e" />;
    case 'calendar': return <Calendar className={classes} />;
    case 'compass': return <Compass className={classes} />;
    case 'shield': return <ShieldAlert className={classes} />;
    case 'sparkles': return <Sparkles className={classes} />;
    case 'star': return <Star className={classes} fill="#f43f5e" />;
    default: return <Heart className={classes} />;
  }
};

export default function TimelineSection() {
  return (
    <section id="timeline-section" className="py-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-sm tracking-wider uppercase font-sans text-rose-400 bg-pink-100/50 px-4 py-1.5 rounded-full border border-pink-200/50">আমাদের ভালোবাসার গল্প</span>
            <h2 className="text-3xl md:text-5xl font-serif text-pink-600 mt-4 mb-2 font-bold glowing-pink-text">
              পথচলার রঙিন দিনগুলো 🕰️
            </h2>
            <p className="text-gray-500 font-sans text-sm md:text-base max-w-lg mx-auto">
              ৪ বছরের প্রতিটি মাইলফলক যা আমাদের ভালোবাসাকে করেছে চিরসবুজ
            </p>
          </motion.div>
        </div>

        {/* Timeline body with a glowing vertical line */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 md:-translate-x-0.25 bg-gradient-to-b from-pink-300 via-rose-500 to-pink-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]"></div>

          {/* Events list */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={event.id} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                  
                  {/* Outer circle layout */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1.5 md:-translate-x-4.5 z-15">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center shadow-md cursor-help"
                      title={event.title}
                    >
                      {renderIcon(event.icon)}
                    </motion.div>
                  </div>

                  {/* Left branch card (even cards go left on desktop, odd cards are blank placeholder or left branch text) */}
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:order-1' : 'md:order-3 md:text-right'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                      className="glass-panel p-6 rounded-2xl shadow-sm border border-white/60 hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-pink-100/40 to-transparent rounded-tr-2xl pointer-events-none"></div>

                      <span className="text-xs font-mono font-bold text-rose-400 bg-pink-100/60 px-3 py-1 rounded-full">{event.date}</span>
                      <h3 className="text-xl md:text-2xl font-serif text-pink-600 font-bold mt-2.5 mb-2">{event.title}</h3>
                      <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{event.description}</p>
                    </motion.div>
                  </div>

                  {/* Center dummy filler for desktop sizing */}
                  <div className="hidden md:block w-[45%] md:order-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="p-2 bg-white/40 border border-white rounded-2xl shadow-sm"
                    >
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 md:h-56 object-cover rounded-xl shadow-inner filter brightness-95 hover:brightness-100 transition-all duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (event.id === 'meet') {
                            target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80';
                          } else {
                            target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80';
                          }
                        }}
                      />
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
