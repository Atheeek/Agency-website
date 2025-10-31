"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { cn } from "../utils/cn";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface TeamCarouselProps {
  members: TeamMember[];
  title?: string;
  titleSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  titleColor?: string;
  background?: string;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  showArrows?: boolean;
  showDots?: boolean;
  keyboardNavigation?: boolean;
  touchNavigation?: boolean;
  animationDuration?: number;
  autoPlay?: number;
  pauseOnHover?: boolean;
  visibleCards?: number;
  sideCardScale?: number;
  sideCardOpacity?: number;
  grayscaleEffect?: boolean;
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  infoPosition?: "bottom" | "overlay" | "none";
  infoTextColor?: string;
  infoBackground?: string;
  onMemberChange?: (member: TeamMember, index: number) => void;
  onCardClick?: (member: TeamMember, index: number) => void;
  initialIndex?: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  members,
  title = "OUR TEAM",
  titleSize = "2xl",
  titleColor = "rgba(0, 76, 255, 1)",
  background,
  cardWidth = 280,
  cardHeight = 380,
  cardRadius = 20,
  showArrows = true,
  showDots = true,
  keyboardNavigation = true,
  touchNavigation = true,
  animationDuration = 800,
  autoPlay = 0,
  pauseOnHover = true,
  sideCardScale = 0.9,
  sideCardOpacity = 0.8,
  grayscaleEffect = true,
  className,
  cardClassName,
  titleClassName,
  infoPosition = "bottom",
  infoTextColor = "rgba(255,255,255,0.9)",
  infoBackground = "transparent",
  onMemberChange,
  onCardClick,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalMembers = members.length;

  /** ───────────────────────────────
   * PAGINATION + AUTO CYCLE
   * ───────────────────────────────*/
  const paginate = useCallback(
    (newDirection: number) => {
      if (totalMembers === 0) return;
      setDirection(newDirection);
      const nextIndex = (currentIndex + newDirection + totalMembers) % totalMembers;
      setCurrentIndex(nextIndex);
      onMemberChange?.(members[nextIndex], nextIndex);
    },
    [currentIndex, totalMembers, members, onMemberChange]
  );

  /** ───────────────────────────────
   * POSITION CALCULATION
   * (Balanced — fixes the issue)
   * ───────────────────────────────*/
  const calculatePosition = (index: number) => {
    const diff = (index - currentIndex + totalMembers) % totalMembers;
    if (diff === 0) return "center";
    if (diff === 1 || (diff === -(totalMembers - 1))) return "right-1";
    if (diff === totalMembers - 1 || diff === -1) return "left-1";
    return "hidden";
  };

  /** ───────────────────────────────
   * VARIANT STYLES
   * ───────────────────────────────*/
  const getVariantStyles = (position: string): TargetAndTransition => {
    const transition = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    };

    switch (position) {
      case "center":
        return {
          zIndex: 10,
          opacity: 1,
          scale: 1.1,
          x: 0,
          filter: "grayscale(0%)",
          pointerEvents: "auto",
          transition,
        };
      case "right-1":
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: cardWidth * 0.8,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          pointerEvents: "auto",
          transition,
        };
      case "left-1":
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: -cardWidth * 0.8,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          pointerEvents: "auto",
          transition,
        };
      default:
        return {
          zIndex: 0,
          opacity: 0,
          scale: 0.8,
          x: direction > 0 ? cardWidth * 2 : -cardWidth * 2,
          filter: grayscaleEffect ? "grayscale(100%)" : "none",
          pointerEvents: "none",
          transition,
        };
    }
  };

  /** ───────────────────────────────
   * AUTO PLAY
   * ───────────────────────────────*/
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (autoPlay > 0) interval = setInterval(() => paginate(1), autoPlay);

    const container = document.getElementById("team-carousel-container");
    const stop = () => interval && clearInterval(interval);
    const start = () => (interval = setInterval(() => paginate(1), autoPlay));

    if (pauseOnHover && autoPlay > 0 && container) {
      container.addEventListener("mouseenter", stop);
      container.addEventListener("mouseleave", start);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (container && pauseOnHover && autoPlay > 0) {
        container.removeEventListener("mouseenter", stop);
        container.removeEventListener("mouseleave", start);
      }
    };
  }, [autoPlay, paginate, pauseOnHover]);

  /** ───────────────────────────────
   * KEYBOARD + TOUCH NAVIGATION
   * ───────────────────────────────*/
  useEffect(() => {
    if (!keyboardNavigation) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [keyboardNavigation, paginate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!touchNavigation) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchNavigation) return;
    const swipe = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(swipe) > 50) paginate(swipe > 0 ? 1 : -1);
  };

  const titleSizes = {
    sm: "text-4xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl",
    "2xl": "text-8xl",
  };

  /** ───────────────────────────────
   * RENDER
   * ───────────────────────────────*/
  return (
    <div
      id="team-carousel-container"
      className={cn(
        "min-h-screen flex flex-col items-center justify-center overflow-hidden relative",
        className
      )}
      style={{ background }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {title && (
        <h2
          className={cn(
            "font-black uppercase tracking-tight absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap",
            titleSizes[titleSize],
            titleClassName
          )}
          style={{
            color: "transparent",
            background: `linear-gradient(to bottom, ${titleColor}75 40%, transparent 76%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {title}
        </h2>
      )}

      {/* Card Container */}
      <div
        className="w-full max-w-6xl relative mt-20"
        style={{
          height: cardHeight + 100,
          perspective: "1000px",
        }}
      >
        {showArrows && (
          <>
            <motion.button
              onClick={() => paginate(-1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Animated Cards */}
        <div className="w-full h-full flex justify-center items-center relative">
          <AnimatePresence initial={false} custom={direction}>
            {members.map((member, index) => {
              const position = calculatePosition(index);
              if (position === "hidden") return null;

              return (
                <motion.div
                  key={member.id}
                  className={cn(
                    "absolute bg-white overflow-hidden shadow-2xl cursor-pointer",
                    cardClassName
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: cardRadius,
                    top: "50%",
                    left: "50%",
                    marginLeft: -cardWidth / 2,
                    marginTop: -cardHeight / 2,
                  }}
                  initial={getVariantStyles("hidden")}
                  animate={getVariantStyles(position)}
                  exit={getVariantStyles("hidden")}
                  onClick={() => onCardClick?.(member, index)}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  {infoPosition === "overlay" && (
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 text-center"
                      style={{
                        background:
                          infoBackground ||
                          "linear-gradient(transparent, rgba(0,0,0,0.8))",
                        color: infoTextColor,
                      }}
                    >
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className="text-sm opacity-90">{member.role}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Info */}
      {infoPosition === "bottom" && members[currentIndex] && (
        <motion.div
          key={members[currentIndex].id + "-info"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-10"
        >
          <h2
            className="text-4xl font-bold mb-3 relative inline-block"
            style={{ color: infoTextColor }}
          >
            {members[currentIndex].name}
            {/* <span
              className="absolute top-full left-0 w-full h-0.5 mt-2"
              style={{ background: infoTextColor }}
            /> */}
          </h2>
          <p
            className="text-xl font-medium opacity-80 uppercase tracking-wider"
            style={{ color: infoTextColor }}
          >
            {members[currentIndex].role}
          </p>
          {members[currentIndex].bio && (
            <p
              className="text-base mt-4 max-w-lg mx-auto opacity-70"
              style={{ color: infoTextColor }}
            >
              {members[currentIndex].bio}
            </p>
          )}
        </motion.div>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center gap-3 mt-10 absolute bottom-8 left-1/2 -translate-x-1/2">
          {members.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex ? "scale-125" : "hover:scale-110"
              )}
              style={{
                background:
                  index === currentIndex
                    ? infoTextColor
                    : `${infoTextColor}40`,
              }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
