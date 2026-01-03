"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const footerLinks = {
  company: [
    { label: "Services", href: "/services" },
    { label: "Community", href: "/community" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "For Leaders", href: "/services#leaders" },
    { label: "For Partners", href: "/services#partners" },
    { label: "AI Innovation", href: "/services#ai" },
    { label: "HR Emerging Talent", href: "/community" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "Email", href: "mailto:hello@nexthorizonleadership.com", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Gradient divider at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.35 0.12 250 / 0.3), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.18 195 / 0.2), transparent 70%)",
          }}
        />
      </div>

      {/* Texture */}
      <div className="absolute inset-0 texture-noise opacity-5" />

      <div className="container relative z-10">
        {/* Newsletter section */}
        <div className="border-b border-white/10 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-headline text-2xl sm:text-3xl font-bold mb-3"
              >
                Stay Ahead of the Curve
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/60"
              >
                Get insights on leadership, talent trends, and AI innovation delivered to your inbox.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <NewsletterForm />
            </motion.div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Logo showText={false} className="mb-6" />
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Empowering forward-looking leaders by connecting them with world-class partners and innovators.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {footerLinks.social.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-primary hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Company links */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white/80">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources links */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white/80">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white/80">
                Get in Touch
              </h4>
              <p className="text-sm text-white/60 mb-4">
                Ready to shape the future of leadership?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              &copy; {new Date().getFullYear()} Next Horizon Leadership. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
