import { motion } from 'framer-motion';
import { ArrowUp, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: Github, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Instagram, href: '#' },
];

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return (
    <footer className="relative py-16 px-4 md:px-8 bg-black border-t border-white/10 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center space-y-12">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border border-white/20 flex items-center justify-center relative"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute inset-2 border border-white/10"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="text-2xl font-bold gradient-text relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              A
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.nav
          className="flex flex-wrap justify-center gap-4 md:gap-8 px-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {footerLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              className="text-gray-400 hover:text-white tracking-wider uppercase text-sm transition-colors duration-200 relative group"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-white origin-left scale-x-0 group-hover:scale-x-100"
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </motion.nav>

        <motion.div
          className="flex gap-4 md:gap-6 px-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {socialLinks.map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all duration-200"
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-500 text-sm tracking-wider">
            © 2024 AGENCY. ALL RIGHTS RESERVED.
          </p>
          <p className="text-gray-600 text-xs tracking-widest uppercase">
            Crafted with precision & passion
          </p>
        </motion.div>
      </div>

      <motion.button
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-white text-black flex items-center justify-center group hover:bg-gradient-to-br hover:from-zinc-800 hover:to-black hover:text-white transition-all duration-300 z-50"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
