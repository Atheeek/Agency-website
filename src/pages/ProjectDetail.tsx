import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Building } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug!);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate elements on scroll
      gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="fixed top-8 left-4 md:left-8 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="relative z-10 text-center px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6"
          >
            <span className="text-sm tracking-[0.3em] text-gray-400 uppercase">
              {project.company}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {project.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
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
                className="flex items-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Project Details */}
      <div className="px-8 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Meta Information */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-on-scroll"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">{project.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">{project.company}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Project Overview</h2>
            <div className="space-y-6">
              {project.description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div className="mt-16 animate-on-scroll">
            <h3 className="text-2xl font-bold mb-8">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div className="mt-16 flex gap-4 animate-on-scroll">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
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
                className="flex items-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Live Site
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
