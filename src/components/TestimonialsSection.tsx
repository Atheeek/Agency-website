import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const logos = [
  'TESLA',
  'NIKE',
  'APPLE',
  'SPOTIFY',
  'NETFLIX',
  'AMAZON',
  'GOOGLE',
  'MICROSOFT',
];

const testimonials = [
  {
    quote: "They transformed our digital presence completely. The attention to detail and innovative approach exceeded all expectations.",
    author: 'Sarah Chen',
    role: 'CEO, TechVision Inc',
    rating: 5,
  },
  {
    quote: "Working with this team was an absolute pleasure. They delivered a stunning website that perfectly captures our brand essence.",
    author: 'Marcus Rodriguez',
    role: 'Founder, Luxe Brands',
    rating: 5,
  },
  {
    quote: "The level of creativity and technical expertise is unmatched. Our conversion rates increased by 340% after the redesign.",
    author: 'Emily Thompson',
    role: 'CMO, Nexus Solutions',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 md:px-8 relative overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-4">
            CLIENT <span className="gradient-text">LOVE</span>
          </h2>
        </motion.div>

        <div className="mb-24 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <motion.div
                key={index}
                className="text-4xl md:text-5xl font-bold text-white/10 tracking-wider"
                whileHover={{ scale: 1.2, color: 'rgba(255,255,255,0.3)' }}
                transition={{ duration: 0.3 }}
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, scale: 0.95, y: 50, filter: 'blur(10px)' }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-full p-4 md:p-8 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/10 backdrop-blur-sm overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />

                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-white text-white" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.blockquote
                    className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    "{testimonial.quote}"
                  </motion.blockquote>

                  <motion.div
                    className="border-t border-white/10 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    <p className="font-semibold text-white tracking-wide">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 tracking-wider mt-1">
                      {testimonial.role}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
