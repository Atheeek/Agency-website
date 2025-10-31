import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

export function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 md:px-8 relative overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-black" />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-sm tracking-[0.3em] text-gray-500 uppercase inline-block mb-8"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={
                isInView
                  ? { opacity: 1, letterSpacing: '0.3em' }
                  : {}
              }
              transition={{ duration: 1, delay: 0.2 }}
            >
              Get In Touch
            </motion.span>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tighter mb-8"
              initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : {}
              }
              transition={{ duration: 1, delay: 0.3 }}
            >
              LET'S BUILD
              <motion.span
                className="block gradient-text"
                initial={{ opacity: 0, letterSpacing: '-0.05em' }}
                animate={
                  isInView
                    ? { opacity: 1, letterSpacing: '-0.02em' }
                    : {}
                }
                transition={{ duration: 1, delay: 0.5 }}
              >
                SOMETHING EXTRAORDINARY
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Ready to elevate your digital presence? Let's create an experience that
              captivates your audience and drives results.
            </motion.p>
          </motion.div>

          <motion.div
            className="inline-block relative mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-white/20 to-transparent blur-2xl opacity-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            <motion.button
              className="relative group px-12 py-6 bg-white text-black text-lg font-bold tracking-widest uppercase overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute  inset-0 bg-gradient-to-r from-zinc-800 via-zinc-900 to-black"
                initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                animate={{
                  clipPath: isHovered
                    ? 'circle(150% at 50% 50%)'
                    : 'circle(0% at 50% 50%)',
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              <span className="relative z-10   flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                Start a Project
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>

            <motion.div
              className="absolute inset-0 border-2 border-white/20"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                opacity: isHovered ? [1, 0, 1] : 0,
              }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 md:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { icon: Mail, text: 'hello@agency.com' },
              { icon: Phone, text: '+1 (555) 123-4567' },
              { icon: MapPin, text: 'San Francisco, CA' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative p-6 border border-white/10 hover:border-white/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <Icon className="w-6 h-6 mx-auto mb-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </section>
  );
}
