import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Building,
} from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug!);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".animate-on-scroll").forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-6 left-4 md:left-10 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />

        <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl">
          <motion.span
            className="text-xs md:text-sm tracking-[0.3em] text-gray-400 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {project.company}
          </motion.span>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {project.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Project Details */}
      <div className="px-6 md:px-16 py-16 md:py-24 space-y-16 max-w-5xl mx-auto">
        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-on-scroll">
          <div className="flex items-center gap-3 text-gray-400">
            <Calendar className="w-5 h-5" />
            <span>{project.date}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <Building className="w-5 h-5" />
            <span>{project.company}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-white bg-clip-text text-transparent">
            Project Overview
          </h2>
          <div className="space-y-6">
            {project.description.map((p, i) => (
              <p
                key={i}
                className="text-gray-300 text-base md:text-lg leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="animate-on-scroll">
          <h3 className="text-2xl font-bold mb-6">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="animate-on-scroll flex flex-col sm:flex-row gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              <Github className="w-5 h-5" />
              View Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Live Site
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
