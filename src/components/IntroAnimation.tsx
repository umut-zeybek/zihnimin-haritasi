import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isZooming, setIsZooming] = useState(false);

  const handleStart = () => {
    setIsZooming(true);
    // Animasyon süresini tam 2 saniyeye indirdik.
    setTimeout(() => {
      onComplete();
    }, 2000); 
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-black z-0" />

        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          initial={{ scale: 1, opacity: 0 }}
          animate={
            isZooming 
              ? { scale: 150, filter: "brightness(0.3) blur(8px)" } 
              : { scale: 1, opacity: 1, filter: "brightness(0.8) contrast(1.3) sepia(0.2) hue-rotate(200deg)" }
          }
          transition={{ 
            opacity: { duration: 1.5 },
            // Süreyi tam 2 saniyeye indirdik
            scale: { duration: 2, ease: [0.64, 0, 0.78, 0] },
            filter: { duration: 2 }
          }}
          style={{ 
            // Kullanıcı isteğine göre hafif sol altına (çapraza) kaydırıldı:
            transformOrigin: "43% 46%" 
          }}
        >
          {/* Arka plan dolgusu için 'contain' (çok küçük) ve 'cover' (çok büyük) arası özel bir değer: 
              Yüksekliği ekranın %120'si kadar yapıyoruz, böylece yüz büyük duruyor ama aşırı kesilmiyor. */}
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: "url('/ana_yuz2.jpeg')",
              backgroundSize: "auto 120%", 
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 30%", // Yüzün biraz daha yukarıda kalması için
              boxShadow: "inset 0 0 200px 150px black"
            }}
          />
        </motion.div>

        {/* Tünel Efekti (Mind Tunnel Fade) */}
        <motion.div 
          className="absolute inset-0 z-15 bg-gradient-to-t from-black via-indigo-950 to-black mix-blend-multiply"
          initial={{ opacity: 0 }}
          animate={{ opacity: isZooming ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />

        {/* UI Elemanları */}
        {!isZooming && (
          <motion.div
            className="absolute z-20 flex flex-col items-center justify-center bottom-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] mb-8 text-center">
              ZİHNİMİN <span className="font-bold text-white">HARİTASI</span>
            </h1>
            
            <button 
              onClick={handleStart}
              className="px-10 py-4 border border-white/30 rounded-full text-white tracking-widest uppercase text-sm hover:bg-white/10 hover:border-white/80 transition-all duration-300 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 20px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)"
              }}
            >
              Keşfet
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
