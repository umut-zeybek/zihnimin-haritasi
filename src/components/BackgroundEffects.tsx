import React from 'react';
import { motion } from 'framer-motion';

// Soft biological particles (cells/vesicles) instead of sharp stars
const particles = Array.from({ length: 150 }).map((_, i) => ({
  id: `particle-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 6 + 2, // larger and softer
  opacity: Math.random() * 0.3 + 0.1,
  delay: Math.random() * -10, // negative delay so they start immediately
  duration: Math.random() * 15 + 10 // slow drift
}));

// Random synapse flashes to simulate neural activity
const synapses = Array.from({ length: 8 }).map((_, i) => ({
  id: `synapse-${i}`,
  x: Math.random() * 90 + 5,
  y: Math.random() * 90 + 5,
  delay: Math.random() * -10,
  duration: Math.random() * 4 + 3,
  color: Math.random() > 0.5 ? 'bg-cyan-500' : 'bg-fuchsia-600',
  size: Math.random() * 200 + 100
}));

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Deep Neural Space Gradient */}
      {/* A dark mixture of indigo, violet and black to simulate biological fluid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#13073A] via-[#090214] to-black" />
      
      {/* Abstract Biological Nebula Glows (Large Synaptic Clouds) */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 5 }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-fuchsia-900/10 rounded-full blur-[150px] mix-blend-screen" />
      </motion.div>

      {/* Floating Microscopic Particles */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-indigo-300"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: 'blur(2px)',
              animation: `float ${p.duration}s infinite ${p.delay}s ease-in-out alternate`
            }}
          />
        ))}
      </motion.div>

      {/* Synapse Electric Flashes */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 1 }}
      >
        {synapses.map((synapse) => (
          <div
            key={synapse.id}
            className={`absolute rounded-full blur-[80px] ${synapse.color} mix-blend-screen`}
            style={{
              left: `${synapse.x}%`,
              top: `${synapse.y}%`,
              width: `${synapse.size}px`,
              height: `${synapse.size}px`,
              opacity: 0,
              animation: `synapse-pulse ${synapse.duration}s infinite ${synapse.delay}s ease-in-out`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BackgroundEffects;
