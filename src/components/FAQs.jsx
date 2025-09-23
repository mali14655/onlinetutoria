import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const contentRefs = useRef([]);

  const fetchFaqs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/faqs`);
    const data = await res.json();
    setFaqs(data);

    // Trigger animation with stagger
    data.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleIndexes((prev) => [...prev, idx]);
      }, 150 * idx); // stagger animation
    });
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mx-auto px-4 w-[80%] flex flex-col gap-10 justify-between items-center py-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        FAQs
      </h2>
      <div className="space-y-4 w-full md:w-[80%]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const isVisible = visibleIndexes.includes(idx);

          return (
            <div
              key={idx}
              className={`border w-full border-gray-300 rounded-lg shadow-sm transform transition-all duration-700 ease-out
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center px-4 py-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-100"
              >
                <span className="text-sm sm:text-xl">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-purple-600" : "text-gray-500"
                  }`}
                />
              </button>

              <div
                ref={(el) => (contentRefs.current[idx] = el)}
                style={{
                  height: isOpen
                    ? contentRefs.current[idx]?.scrollHeight + "px"
                    : "0px",
                }}
                className="transition-all duration-500 ease-in-out overflow-hidden px-4 text-gray-600 bg-gray-50"
              >
                <p className="py-4">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
