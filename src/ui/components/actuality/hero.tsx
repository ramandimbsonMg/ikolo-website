'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardHeroActuality } from './card-hero';

const images = [
  '/assets/images/hero/actuality.jpg',
  '/assets/images/hero/actuality2.jpg',
  '/assets/images/hero/actuality3.jpg',
];

export function HeroActuality() {
  const [current, setCurrent] = useState(0);

  // Changer l'image toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className='text-white overflow-hidden'>
      {/* ✅ Progress bar en haut */}
      <div className='absolute top-0 left-0 w-full h-1.5 bg-gray-300 z-20'>
        <motion.div
          key={current}
          className='h-1.5 bg-green-500'
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </div>

      {/* ✅ Images de fond */}
      <AnimatePresence>
        {images.map(
          (img, index) =>
            index === current && (
              <motion.div
                key={index}
                className='absolute inset-0 h-[30rem] bg-cover bg-center z-0'
                style={{ backgroundImage: `url(${img})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )
        )}
      </AnimatePresence>

      {/* ✅ Overlay noir */}
      <div className='absolute inset-0 bg-black opacity-50 z-10 h-[30rem]'></div>

      {/* ✅ Contenu */}
      <div className='grid grid-cols-12 mx-auto max-w-7xl'>
        <div className='col-span-7 relative z-20 max-w-4xl mx-auto px-6 mt-10'>
          <p className='mt-4 text-lg md:text-xl bg-white pt-2 pb-2 px-4 rounded text-gray-800 inline-block'>
            ONG MADA SINK MAINTSO : Environnement & développement durable
          </p>
          <div className='space-y-1'>
            <h1 className='mt-6 text-5xl font-bold bg-green-500/20 rounded px-3 pt-3 pb-3 font-serif'>
              Luttons ensemble contre injustice
            </h1>
            <h1 className='mt-6 text-5xl font-bold bg-green-500/20 rounded px-3 pt-3 pb-3 font-serif'>
              et pour un avenir équitable.
            </h1>
          </div>
        </div>

        <CardHeroActuality className='col-span-5 text-center text-green-700 shadow-lg border mt-60 z-10 absolute inset-0' />
      </div>
    </section>
    </>
  );
}
