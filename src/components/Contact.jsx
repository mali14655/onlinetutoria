import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { SITE_EMAIL } from "../constants/contact";

export default function Contact() {
  const form = useRef();
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_6tg2kvc", "template_d92twud", form.current, "kvE7vse_fzUqT5Sy4")
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setSuccess(false);
        }
      )
      .finally(() => {
        setLoading(false);
        setShowPopup(true);
      });
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20 relative">
      {/* Success/Error Toast */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white ${
              success ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {success ? "Message sent successfully!" : "Failed to send message."}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12"
      >
        {/* Contact Details */}
        <div className="md:py-10 pl-2">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Get in Touch</h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-center gap-3 hover:text-blue-500 transition">
              <FaEnvelope className="text-blue-600" />
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </li>
            <li className="flex items-center gap-3 hover:text-bkue-500 transition">
              <FaWhatsapp className="text-green-500" />
              <a href="https://wa.me/3319694000" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-blue-500 transition">
              <FaInstagram className="text-pink-500" />
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-blue-500 transition">
              <FaLinkedin className="text-blue-700" />
              <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-blue-500 transition">
              <FaFacebook className="text-blue-600" />
              <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send a Message</h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="email"
              name="user_email"
              required
              placeholder="Your Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
