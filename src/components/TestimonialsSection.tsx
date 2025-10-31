"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils'; // Assuming you have this from shadcn
import { motion, useInView } from 'framer-motion';

const carouselTestimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with COMPANY.",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    tempId: 1,
    testimonial: "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://i.pravatar.cc/150?img=2",
    rating: 5,
  },
  {
    tempId: 2,
    testimonial: "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://i.pravatar.cc/150?img=3",
    rating: 5,
  },
  {
    tempId: 3,
    testimonial: "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://i.pravatar.cc/150?img=4",
    rating: 4,
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre, Head of Design at CreativeSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://i.pravatar.cc/150?img=6",
    rating: 5,
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on COMPANY, we're never going back.",
    by: "Pam, Marketing Director at BrandBuilders",
    imgSrc: "https://i.pravatar.cc/150?img=7",
    rating: 5,
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof carouselTestimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;
  const [author, role] = testimonial.by.split(', ');

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out",
        "h-full p-8 border border-gray-300 overflow-hidden", // Base border for all cards
        isCenter
          ? "z-10 bg-white/90 shadow-xl text-black" // White background for center
          : "z-0 bg-zinc-900 text-gray-300 opacity-" // Dark background for sides
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${cardSize * 0.7 * position}px) /* Adjusted X translation for better spacing */
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          scale(${isCenter ? 1 : 0.9})
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        // Added clipPath and box-shadow back for the center card to mimic the image
        clipPath: isCenter ? `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)` : 'none',
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(210 40% 96.1%)" : "none" // Light shadow for the white card
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* <img
            src={testimonial.imgSrc}
            alt={author}
            className={cn(
              "h-14 w-12 object-cover object-top mb-4",
              isCenter ? "bg-gray-200" : "bg-gray-700" // Image background based on card state
            )}
            style={{
              boxShadow: isCenter ? "3px 3px 0px hsl(0 0% 100%)" : "none" // Shadow for image only on center card
            }}
          /> */}

        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className={cn("w-5 h-5", isCenter ? "fill-yellow-500 text-yellow-500" : "fill-gray-500 text-gray-500")} />
          ))}
        </div>

        <blockquote className={cn("text-lg leading-relaxed italic flex-grow", isCenter ? "text-gray-800" : "text-gray-300")}>
          "{testimonial.testimonial}"
        </blockquote>

        <div className="border-t border-gray-200/50 pt-6 mt-8">
          <p className={cn("font-semibold tracking-wide", isCenter ? "text-gray-900" : "text-white")}>
            {author}
          </p>
          <p className={cn("text-sm tracking-wider mt-1", isCenter ? "text-gray-600" : "text-gray-400")}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(carouselTestimonials);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      // Adjusted cardSize for better mobile display, making it slightly smaller
      setCardSize(matches ? 365 : 280); 
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  // --- Mobile Touch/Drag Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diffX = currentX.current - startX.current;

    // Determine if it was a significant swipe
    if (Math.abs(diffX) > 50) { // Threshold for a swipe
      if (diffX > 0) {
        handleMove(-1); // Swipe right, move to previous
      } else {
        handleMove(1); // Swipe left, move to next
      }
    }
  };


  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex justify-center items-center" // Added flex-center
      style={{ height: 600 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = index - Math.floor(testimonialsList.length / 2); // Center the middle item

        // Only render visible cards (e.g., 3-5 cards around the center)
        if (Math.abs(position) > 2) return null; // Adjust this number to control how many cards are rendered

        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-20"> {/* Added z-20 for buttons */}
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all",
            "bg-zinc-900 border-2 border-zinc-700 text-white",
            "hover:bg-zinc-800 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all",
            "bg-zinc-900 border-2 border-zinc-700 text-white",
            "hover:bg-zinc-800 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const logos = [
  'TESLA', 'NIKE', 'APPLE', 'SPOTIFY', 'NETFLIX', 'AMAZON', 'GOOGLE', 'MICROSOFT',
];

export function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 md:px-8 relative overflow-hidden bg-black min-h-screen flex items-center" // Added flex items-center for vertical centering
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

        {/* <div className="mb-24 overflow-hidden">
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
        </div> */}

        <StaggerTestimonials />
        
      </div>
    </section>
  );
}