import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function Home(){
  return (
    <div>
     
     <Navbar/>

      <main className="max-w-6xl mx-auto p-8">
        <section className="mb-8">
          <motion.h2 initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="text-4xl font-bold">A modern learning hub</motion.h2>
          <p className="mt-4 text-lg">Notes, AI summaries, code editor and admin analytics — built with MERN + Tailwind.</p>
          <div className="mt-6">
            <Link to="/login" className="inline-block px-6 py-3 bg-teal-600 text-white rounded shadow hover:scale-105">Get Started</Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">Organised Notes</h3>
            <p className="mt-2 text-sm">Semester-wise and T1-T4 categorized notes.</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">AI Summaries</h3>
            <p className="mt-2 text-sm">Generate concise summaries using LLMs (simulated by default).</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold">Live Code Editor</h3>
            <p className="mt-2 text-sm">Write HTML/CSS and preview in real-time. Save to localStorage.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
