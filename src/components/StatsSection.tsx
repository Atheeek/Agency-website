import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface StatProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function AnimatedCounter({ end, duration = 2, suffix = '', label, delay = 0 }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => {
        motionValue.set(end);
      }, delay * 1000);
    } else if (!isInView) {
      setHasAnimated(false);
      motionValue.set(0);
    }
  }, [isInView, end, motionValue, delay, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      className="text-center relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-2xl"
        transition={{ duration: 0.5 }}
      />

      <div className="relative">
        <motion.div className="mb-6 relative inline-block">
          <motion.div
            className="absolute -inset-4 border border-white/20"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-8 border border-white/10"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <motion.div
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold gradient-text mb-4"
          animate={
            isInView && hasAnimated
              ? {
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0)',
                    '0 0 40px rgba(255,255,255,0.3)',
                    '0 0 20px rgba(255,255,255,0)',
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          {displayValue}
          {suffix}
        </motion.div>

        <motion.div
          className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.3 }}
        />

        <p className="text-sm md:text-base tracking-[0.3em] text-gray-500 uppercase">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black flex items-center"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">By The Numbers</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-4">
            PROVEN <span className="gradient-text">RESULTS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-6xl mx-auto px-4 md:px-0">
          <AnimatedCounter end={250} suffix="+" label="Projects Delivered" delay={0} />
          <AnimatedCounter end={180} suffix="+" label="Happy Clients" delay={0.1} />
          <AnimatedCounter end={47} label="Awards Won" delay={0.2} />
          <AnimatedCounter end={98} suffix="%" label="Satisfaction Rate" delay={0.3} />
        </div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="inline-block relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-white/10 blur-xl" />
            <p className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 italic tracking-wide px-4 md:px-8">
              "Excellence is not a destination, it's a continuous journey"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
