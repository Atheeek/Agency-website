import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Zap, Globe, Smartphone, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'WEB DEVELOPMENT',
    description: 'Cutting-edge development',
    detail: 'Building scalable, performant web applications with modern frameworks and best practices.',
  },
  {
    icon: Palette,
    title: 'CREATIVE DESIGN',
    description: 'Visual storytelling',
    detail: 'Crafting unique brand identities and interfaces that captivate and engage users.',
  },
  {
    icon: Zap,
    title: 'PERFORMANCE',
    description: 'Lightning fast',
    detail: 'Optimizing every interaction for maximum speed and seamless user experience.',
  },
  {
    icon: Globe,
    title: 'DIGITAL STRATEGY',
    description: 'Growth focused',
    detail: 'Data-driven strategies that align technology with your business objectives.',
  },
  {
    icon: Smartphone,
    title: 'MOBILE FIRST',
    description: 'Responsive everywhere',
    detail: 'Creating experiences that adapt fluidly across all devices and screen sizes.',
  },
  {
    icon: Sparkles,
    title: 'MOTION DESIGN',
    description: 'Cinematic experiences',
    detail: 'Bringing interfaces to life with purposeful animations and micro-interactions.',
  },
];

export function ServicesGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_60%)]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">What We Do</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-4">
            OUR <span className="gradient-text">SERVICES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-full p-8 bg-zinc-900/50 border border-white/10 backdrop-blur-sm overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-transparent origin-left scale-x-0 group-hover:scale-x-100"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <motion.div
                    className="relative z-10"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-12 h-12 mb-6 text-white" strokeWidth={1.5} />
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold tracking-wider mb-2 relative z-10"
                    animate={{
                      y: hoveredIndex === index ? -5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 text-sm tracking-wide mb-4 relative z-10"
                    animate={{
                      y: hoveredIndex === index ? -5 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {service.description}
                  </motion.p>

                  <motion.div
                    className="overflow-hidden relative z-10"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredIndex === index ? 'auto' : 0,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed pt-2 border-t border-white/10">
                      {service.detail}
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
