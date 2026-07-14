import React from 'react';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import FounderSection from '@/components/FounderSection';
import MissionSection from '@/components/MissionSection';
import CoursesSection from '@/components/CoursesSection';
import GallerySection from '@/components/GallerySection';
import DonationSection from '@/components/DonationSection';
import Footer from '@/components/Footer';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function Home() {
  const { settings, slides, courses, gallery } = useSiteContent();
  return (
    <div className="min-h-screen">
      <Navbar settings={settings} />
      <HeroCarousel slides={slides} />
      <AboutSection settings={settings} />
      <FounderSection settings={settings} />
      <MissionSection settings={settings} />
      <CoursesSection courses={courses} />
      <GallerySection items={gallery} />
      <DonationSection settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}