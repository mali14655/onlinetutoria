import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';

export default function Button() {
  return (
    <>
    <a
      href="https://wa.me/3168969151" // Replace with your actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="flex items-center gap-3 bg-green-500 text-white px-4 py-2 h-14 md:h-auto rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600">
        <FaWhatsapp className="text-2xl" />
        <span className="hidden md:inline-block font-semibold tracking-wide">
          Chat with us
        </span>
      </div>
    </a>
    </>
  )
}
