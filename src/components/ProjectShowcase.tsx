import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

// Optimized image component with loading state
const OptimizedImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const inView = useInView(imgRef, { once: true, margin: "200px" });
  
  useEffect(() => {
    if (inView && imgRef.current) {
      const img = imgRef.current;
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
      }
    }
  }, [inView]);

  return (
    <>
      {!isLoaded && <div className={`${className} bg-zinc-800 animate-pulse`} />}
      <img 
        ref={imgRef}
        src={inView ? src : ''}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading="lazy"
      />
    </>
  );
};

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(scrollContainer);

    const scrollWidth = scrollContainer.scrollWidth;
    const viewportWidth = window.innerWidth;

    // Debounce scroll events for better performance
    let scrollTimeout: number;
    const handleScroll = () => {
      if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
      scrollTimeout = window.requestAnimationFrame(() => {
        // Refresh ScrollTrigger only when needed
        ScrollTrigger.update();
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      // Main horizontal scroll animation with optimized settings
      gsap.to(scrollContainer, {
        x: -(scrollWidth - viewportWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 0.5, // Reduced for smoother scrolling
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true, // Optimize for fast scrolling
          preventOverlaps: true,
        },
      });

      // Batch animations for better performance
      const cards = gsap.utils.toArray('.project-card');
      gsap.set(cards, { opacity: 0 });
      
      ScrollTrigger.batch(cards as Element[], {
        interval: 0.1, // Time between batches
        batchMax: 3,   // Maximum batch size
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          stagger: 0.15,
          overwrite: true,
          ease: 'power2.out',
        }),
        start: "top 90%",
      });
      
      setIsReady(true);
    }, section);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-black will-change-transform">
      <div className="absolute top-20 left-4 md:left-8 lg:left-16 z-20 px-4">
        <span className="text-sm tracking-[0.3em] text-gray-500 uppercase">Our Work</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-2">
          SELECTED <span className="gradient-text">PROJECTS</span>
        </h2>
      </div>
<div
  ref={scrollContainerRef}
  className="absolute top-0 left-0 h-full flex items-center gap-4 md:gap-8 px-4 md:px-8 lg:px-16 will-change-transform"
  style={{ paddingTop: '200px', transform: 'translate3d(0,0,0)' }}
>
  {projects.slice(0, 5).map((project, index) => (   // 👈 limit to 6 projects
    <Link key={index} to={`/project/${project.slug}`} className="will-change-transform">
      <motion.div
        className="project-card flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[35vw] h-[350px] md:h-[350px] group cursor-pointer relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          transform: 'translate3d(0,0,0)'
        }}
      >
        <div className="relative w-full h-full overflow-hidden bg-zinc-900">
          <OptimizedImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs tracking-[0.3em] text-gray-400 uppercase block mb-1">
                  {project.company}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter">
                  {project.title}
                </h3>
              </div>
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm">
              {project.description[0].substring(0, 100)}...
            </p>
          </motion.div>

          <div className="absolute top-0 left-0 w-full h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </motion.div>
    </Link>
  ))}

  <div className="flex-shrink-0 w-[20vw]" />
</div>

      
      {/* More Projects Link */}
      {/* <div className="container mx-auto px-4 mt-8 text-center">
        <Link to="/projects" className="inline-flex items-center gap-2 text-white bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105">
          View More Projects
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div> */}
      
      {/* More Projects Link - Bottom */}
      <div className="absolute bottom-8 left-1/2 transform text-center  -translate-x-1/2 z-20">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
        >
          View More Projects
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Loading indicator */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
}
