import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Pencil, Code, Rocket, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Lightbulb,
    title: 'DISCOVERY',
    description: 'We dive deep into your vision, goals, and audience to craft the perfect strategy.',
    position: 'left',
  },
  {
    icon: Pencil,
    title: 'DESIGN',
    description: 'Creating stunning visuals and interactive prototypes that bring ideas to life.',
    position: 'right',
  },
  {
    icon: Code,
    title: 'DEV',
    description: 'Building robust, scalable solutions with cutting-edge technology and best practices.',
    position: 'left',
  },
  {
    icon: Rocket,
    title: 'LAUNCH',
    description: 'Deploying your project with precision and ensuring a flawless go-live experience.',
    position: 'right',
  },
  {
    icon: CheckCircle,
    title: 'OPTIMIZE',
    description: 'Continuous refinement based on data and feedback to maximize performance.',
    position: 'left',
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black"
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-32 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">Our Process</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mt-4">
            HOW WE <span className="gradient-text">WORK</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            ref={lineRef}
            className="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-white via-gray-500 to-white origin-top"
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-32">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.position === 'left';

              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div
                    className={`flex items-center gap-8 ${
                      isLeft ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <motion.div
                      className={`flex-1 ${isLeft ? 'text-right pr-4 md:pr-8' : 'text-left pl-4 md:pl-8'}`}
                      initial={{
                        x: isLeft ? 100 : -100,
                        opacity: 0,
                        rotateY: isLeft ? 15 : -15,
                      }}
                      whileInView={{
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                      }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div
                        className={`inline-block ${
                          isLeft ? 'text-right' : 'text-left'
                        } max-w-md`}
                      >
                        <motion.h3
                          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider mb-4"
                          whileHover={{ scale: 1.05, x: isLeft ? -10 : 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.title}
                        </motion.h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">{step.description}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="relative z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center relative"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8" strokeWidth={1.5} />

                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white/30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>
                    </motion.div>

                    <div className="flex-1" />
                  </div>

                  {index < steps.length - 1 && (
                    <motion.div
                      className="absolute left-1/2 top-20 -translate-x-1/2 w-px h-32"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
