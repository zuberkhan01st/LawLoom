// app/home/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/component/ui/button/button/page';
import { ArrowRight, CheckCircle, FileText, Zap, Scale, Gavel, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Updated color scheme
const colors = {
  primary: 'bg-[#2B3A67]',       // Deep navy blue
  secondary: 'bg-[#496A81]',      // Muted teal
  accent: 'bg-[#66999B]',         // Soft green
  light: 'bg-[#B3AF8F]',          // Warm beige
  highlight: 'bg-[#FFC482]',      // Soft orange
  textPrimary: 'text-[#2B3A67]',
  textSecondary: 'text-[#496A81]',
  textAccent: 'text-[#66999B]',
  textLight: 'text-[#B3AF8F]',
  textHighlight: 'text-[#FFC482]',
};

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-[#F5F5F0] overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}

// Hero Section
const HeroSection = () => (
  <motion.section
    className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16 relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block px-4 py-2 rounded-full bg-[#2B3A67]/10 text-[#2B3A67] text-sm font-medium mb-4">
          Now with Advanced RAG Technology
        </span>
      </motion.div>
      
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2B3A67] to-[#66999B] tracking-tight mb-6 leading-tight"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Intelligent Legal Research <br />Powered by AI
      </motion.h1>
      
      <motion.p
        className="text-lg sm:text-xl lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Our RAG-enhanced legal assistant combines large language models with real-time retrieval from authoritative sources to deliver precise, up-to-date legal information.
      </motion.p>
      
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link href="/chatbot" passHref>
          <Button className={`${colors.primary} hover:${colors.secondary} text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3 group`}>
            Start Free Consultation
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="/demo" passHref>
          <Button variant="outline" className="px-8 py-4 rounded-lg text-lg font-semibold border-[#496A81] text-[#496A81] hover:bg-[#496A81]/10">
            Watch Demo
          </Button>
        </Link>
      </motion.div>
    </div>
    
    {/* Decorative Background */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-[#66999B]/10 opacity-30" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#2B3A67]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#66999B]/10 rounded-full blur-3xl" />
    </div>
  </motion.section>
);

// Trust Indicators
const TrustIndicators = () => (
  <div className="bg-white py-8 border-t border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <TrustItem value="10,000+" label="Legal Questions Answered" />
        <TrustItem value="500+" label="Legal Sources Integrated" />
        <TrustItem value="98%" label="Accuracy Rate" />
        <TrustItem value="24/7" label="Availability" />
      </div>
    </div>
  </div>
);

const TrustItem = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    className="p-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-2xl font-bold text-[#2B3A67] mb-1">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </motion.div>
);

// Features Section
const FeaturesSection = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2B3A67] mb-4">Legal Research Reinvented</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our AI-powered platform combines the best of legal expertise and cutting-edge technology
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Scale className="w-6 h-6" />} 
          title="Comprehensive Legal Database"
          bgColor="bg-[#2B3A67]/10"
        >
          Access to thousands of case laws, statutes, and legal documents with our RAG-powered retrieval system.
        </FeatureCard>
        
        <FeatureCard 
          icon={<Gavel className="w-6 h-6" />} 
          title="Precision Answers"
          bgColor="bg-[#66999B]/10"
        >
          Get pinpoint accurate responses with citations to authoritative sources for verification.
        </FeatureCard>
        
        <FeatureCard 
          icon={<BookOpen className="w-6 h-6" />} 
          title="Contextual Understanding"
          bgColor="bg-[#496A81]/10"
        >
          Our AI understands legal nuances and provides tailored advice based on your jurisdiction.
        </FeatureCard>
      </div>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  children,
  bgColor = "bg-gray-50"
}: { 
  icon: JSX.Element; 
  title: string; 
  children: React.ReactNode;
  bgColor?: string;
}) => (
  <motion.div
    className={`p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${bgColor}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
  >
    <div className={`w-12 h-12 rounded-lg ${colors.primary} flex items-center justify-center mb-6`}>
      {React.cloneElement(icon, { className: "h-6 w-6 text-white" })}
    </div>
    <h3 className="text-xl font-semibold text-[#2B3A67] mb-3">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </motion.div>
);

// How It Works Section
const HowItWorksSection = () => (
  <section className="py-20 px-6 bg-gradient-to-br from-[#F5F5F0] to-[#E8E8E0]">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2B3A67] mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Three simple steps to get reliable legal information
        </p>
      </motion.div>
      
      <div className="space-y-12">
        <StepCard
          step="1"
          title="Ask Your Legal Question"
          description="Type your question in natural language, just like you'd ask a lawyer."
          example="What are the requirements for a valid will in California?"
          icon={<FileText className="w-5 h-5" />}
        />
        <StepCard
          step="2"
          title="AI Analyzes & Retrieves"
          description="Our system searches through authoritative legal sources to find relevant information."
          example="Retrieving California Probate Code sections 6110-6113..."
          icon={<Zap className="w-5 h-5" />}
          reverse
        />
        <StepCard
          step="3"
          title="Receive Verified Answer"
          description="Get a clear, concise response with citations to primary legal sources."
          example="In California, a will must be in writing, signed by the testator, and witnessed by two competent persons..."
          icon={<CheckCircle className="w-5 h-5" />}
        />
      </div>
    </div>
  </section>
);

// Step Card Component
const StepCard = ({
  step,
  title,
  description,
  example,
  icon,
  reverse = false,
}: {
  step: string;
  title: string;
  description: string;
  example: string;
  icon: JSX.Element;
  reverse?: boolean;
}) => (
  <motion.div
    className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8`}
    initial={{ opacity: 0, x: reverse ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="lg:w-1/2">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-full ${colors.primary} flex items-center justify-center text-white font-bold`}>
          {step}
        </div>
        <h3 className="text-2xl font-semibold text-[#2B3A67]">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex items-center gap-2 text-sm text-[#496A81]">
        {React.cloneElement(icon, { className: "w-4 h-4" })}
        Example question
      </div>
    </div>
    <div className="lg:w-1/2 w-full">
      <div className={`p-6 rounded-lg shadow-sm ${reverse ? 'bg-[#66999B]/10' : 'bg-white'} border border-gray-100`}>
        <p className="text-gray-700 italic">"{example}"</p>
      </div>
    </div>
  </motion.div>
);

// Testimonials Section
const TestimonialsSection = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2B3A67] mb-4">Trusted by Legal Professionals</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          What our users say about our AI legal assistant
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TestimonialCard
          quote="This tool has transformed how I conduct preliminary legal research. The accuracy is impressive."
          author="Sarah Johnson"
          role="Corporate Attorney"
          avatar="/avatar1.jpg" // Replace with actual avatar path
        />
        <TestimonialCard
          quote="As a solo practitioner, this gives me research capabilities I couldn't otherwise afford."
          author="Michael Chen"
          role="Immigration Lawyer"
          avatar="/avatar2.jpg" // Replace with actual avatar path
        />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ quote, author, role, avatar }: { quote: string; author: string; role: string; avatar: string }) => (
  <motion.div
    className="p-8 rounded-xl bg-gray-50 shadow-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-6">
      <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0L13.3333 10H6.66667L0 20H10L3.33333 30H20L13.3333 20H20L16.6667 10H10V0ZM30 0L33.3333 10H26.6667L20 20H30L23.3333 30H40L33.3333 20H40L36.6667 10H30V0Z" fill={`${colors.primary}`} fillOpacity="0.1"/>
      </svg>
    </div>
    <p className="text-lg text-gray-700 mb-6 italic">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
        {/* Replace with actual Image component */}
        <div className="w-full h-full bg-gray-400"></div>
      </div>
      <div>
        <p className="font-medium text-[#2B3A67]">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

// Call to Action Section
const CallToActionSection = () => (
  <section className="py-20 px-6 bg-gradient-to-r from-[#2B3A67] to-[#496A81] text-white">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Legal Research?</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of legal professionals and individuals who trust our AI-powered legal assistant for accurate, timely information.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chatbot" passHref>
            <Button className="bg-white hover:bg-gray-100 text-[#2B3A67] px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3 group">
              Start Free Consultation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/pricing" passHref>
            <Button variant="outline" className="px-8 py-4 rounded-lg text-lg font-semibold border-white text-white hover:bg-white/10">
              View Pricing
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);