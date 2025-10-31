import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text items on scroll
      gsap.fromTo(
        '.about-text-item',
        { opacity: 0, y: 100, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.3,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Animate the 3D visual (scale + opacity)
      gsap.fromTo(
        '.about-visual',
        { opacity: 0, scale: 0.5, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, scale }}
      className="min-h-screen flex items-center py-32 px-4 md:px-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE TEXT */}
          <div className="space-y-12">
            <div className="about-text-item">
              <motion.span className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                About Us
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 leading-tight">
                WE TRANSFORM
                <span className="block gradient-text">IDEAS INTO</span>
                EXPERIENCES
              </h2>
            </div>

            <div className="about-text-item space-y-6">
              <p className="text-xl text-gray-400 leading-relaxed">
                We are a collective of designers, developers, and storytellers obsessed with
                creating digital products that don’t just look beautiful — they feel alive.
              </p>
            </div>

            <div className="about-text-item space-y-6">
              <p className="text-lg text-gray-500 leading-relaxed">
                Every project is a journey through motion, narrative, and interaction. We blend
                cutting-edge technology with timeless design principles to craft experiences
                that captivate and convert.
              </p>
            </div>

            <div className="about-text-item">
              <div className="inline-block">
                <motion.div
                  className="text-6xl font-bold gradient-text"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.span
                    initial={{ display: 'inline-block' }}
                    whileInView={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    10+
                  </motion.span>
                </motion.div>
                <p className="text-sm tracking-widest text-gray-500 mt-2 uppercase">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE 3D VISUAL */}
          <div className="about-visual relative h-[400px] md:h-[600px] flex items-center justify-center">
            <div
              className="
                w-[50vh] md:w-full h-full relative rounded-3xl   shadow-2xl
                transform scale-110 -translate-x-[-8%]
                md:scale-100 md:translate-x-0
              "
            >
              <Spline
                scene="https://prod.spline.design/kzJihsWCNZudnnnA/scene.splinecode"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
