import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -(scrollWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray('.project-card').forEach((card: any) => {
        gsap.fromTo(
          card,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById('horizontal-scroll'),
              start: 'left 80%',
              end: 'left 50%',
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-black">
      <div className="absolute top-20 left-4 md:left-8 lg:left-16 z-20 px-4">
        <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">Our Work</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-2">
          SELECTED <span className="gradient-text">PROJECTS</span>
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="absolute top-0 left-0 h-full flex items-center gap-4 md:gap-8 px-4 md:px-8 lg:px-16"
        style={{ paddingTop: '200px' }}
      >
        {projects.map((project, index) => (
          <Link key={index} to={`/project/${project.slug}`}>
            <motion.div
              className="project-card flex-shrink-0 w-[85vw] sm:w-[80vw] md:w-[50vw] h-[400px] md:h-[500px] group cursor-pointer relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full h-full overflow-hidden bg-zinc-900">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 opacity-0 group-hover:opacity-100"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <motion.span
                        className="text-xs tracking-[0.3em] text-gray-400 uppercase block mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {project.company}
                      </motion.span>
                      <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        {project.title}
                      </motion.h3>
                    </div>
                    <motion.div
                      className="w-12 h-12 bg-white text-black flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-gray-300 text-xs sm:text-sm md:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.description[0]}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          </Link>
        ))}

        <div className="flex-shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}
