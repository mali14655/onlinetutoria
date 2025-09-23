import React, { useEffect, useState } from "react";
import hero from "../assets/herosection.jpg";
import onlineClassImg from "../assets/online-class.jpg"; // Add this image to your assets
import { AnimatePresence } from "framer-motion";
import { PaymentModal } from "../components/PaymentModal";
import "aos/dist/aos.css";
import AOS from "aos";
import Testimonials from "../components/Testimonials";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaVideo,
  FaCalendarAlt,
  FaClock,
  FaCertificate,
} from "react-icons/fa";

export default function Home({ tutors }) {
  const [fadeAos, setFadeAos] = useState("fade-left");
  const [courses, setCourses] = useState([]);
  const [prices, setPrices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const fetchPrices = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pricing`);
    const data = await res.json();
    setPrices(data);
  };

  const fetchCourses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/courses`);
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
    fetchPrices();
  }, []); // Added empty dependency array to prevent infinite loops

  useEffect(() => {
    const handleResize = () => {
      setFadeAos(window.innerWidth < 768 ? "fade-up" : "fade-left");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-gray-600 body-font w-full px-4 sm:px-6">
        <div className="container mx-auto flex px-0 py-24 md:flex-row flex-col items-center">
          <div
            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
            data-aos="fade-right"
          >
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Get tutors online <br className="hidden lg:inline-block" /> Unlock
              Your Potential with Expert-Led Courses
            </h1>
            <p className="mb-8 leading-relaxed">
              Transform your knowledge with personalized, high-quality lessons
              from seasoned educators. Join today and take the first step
              towards your success.
            </p>
            <div className="flex justify-center gap-2">
              <a
                href="#pricing"
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-sm lg:text-lg "
              >
                View Pricing
              </a>
              <a
                href="#how-we-teach"
                className=" inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-sm lg:text-lg"
              >
                Learn How It Works
              </a>
            </div>
          </div>
          <div
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
            data-aos={fadeAos}
          >
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={hero}
            />
          </div>
        </div>
      </section>

      {/* How We Teach Section */}
      <section
        id="how-we-teach"
        className="w-full bg-gray-50 py-24 px-4 sm:px-6"
      >
        <div className="max-w-[1800px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-20  text-center">
            How We Teach
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-4">
            <div className="lg:w-1/2" data-aos="fade-right">
              <img
                src={onlineClassImg}
                alt="Online class through Google Meet"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>

            <div className="lg:w-1/2 py-10" data-aos="fade-left">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Interactive Online Learning Experience
              </h3>
              <p className="text-lg mb-8 text-gray-600">
                We deliver high-quality education through Google Meet, offering
                both one-on-one sessions for personalized attention and group
                classes for collaborative learning. Our virtual classroom
                replicates the in-person experience with real-time interaction,
                screen sharing, and digital whiteboards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaVideo className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Live Sessions
                    </h4>
                    <p className="text-gray-600">
                      Real-time classes with interactive tools
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaChalkboardTeacher className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Expert Tutors
                    </h4>
                    <p className="text-gray-600">
                      Qualified professionals in their fields
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaUsers className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Flexible Options
                    </h4>
                    <p className="text-gray-600">
                      Choose between 1-on-1 or group classes
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Flexible Scheduling
                    </h4>
                    <p className="text-gray-600">Learn at your convenience</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h4 className="font-semibold text-lg mb-3">
                  Getting Started is Easy:
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Choose your course</li>
                  <li>Complete the payment process</li>
                  <li>Receive Google Meet link</li>
                  <li>Join the class at scheduled time</li>
                  <li>Access recorded sessions for review</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section className="py-5 w-[90%] px-4">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-16 pb-4 text-center tracking-wide">
            Meet Our Expert Tutors
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our tutors are highly qualified professionals with years of teaching
            experience, dedicated to helping you achieve your academic goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {Array.isArray(tutors) &&
              tutors.map((tutor, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  className="flex flex-col items-center bg-white shadow-lg rounded-xl sm:px-6 sm:pt-6 sm:pb-6 max-w-sm text-center transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={tutor.picture}
                    alt={tutor.name}
                    className="w-100 h-100 rounded-2xl object-cover sm:border-4 sm:border-gray-100 shadow-md mb-6"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {tutor.name}
                    </h3>
                    <p className="text-blue-500 text-sm font-medium mt-1">
                      {tutor.department || "Department Name"}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {tutor.education || "Education"}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {tutor.experience || "Experience"}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="w-[90%] py-10">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center tracking-wide">
            Our Comprehensive Courses
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            We offer a wide range of courses designed to meet various learning
            needs and academic levels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {courses.map((course, index) => (
              <div
                key={index}
                data-aos="fade-up"
                className="flex flex-col items-center w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden transform scale-100 transition-all duration-[1500ms] ease-in-out hover:scale-[1.02] hover:shadow-2xl"
              >
                <img
                  src={course.picture}
                  alt={course.name}
                  className="w-full h-36 object-cover object-center"
                />
                <div className="p-6 text-center flex flex-col justify-between h-full w-full">
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.name}
                    </h5>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/923168969151?text=I'm%20interested%20in%20${encodeURIComponent(
                      course.name
                    )}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition-all duration-300 mt-4"
                  >
                    Contact via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-[90%] py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Flexible Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Choose the plan that fits your learning needs and budget
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prices.map((element, index) => (
              <div
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={index}
              >
                <h3 className="text-xl font-semibold mb-4">
                  {element.frequency}
                </h3>
                <p className="text-gray-500 font-semibold mb-4 text-2xl">
                  {element.fee}
                </p>
                <ul className="text-gray-700 space-y-3 mb-6 text-left">
                  <li className="flex items-center">
                    <FaChalkboardTeacher className="text-blue-500 mr-2" />
                    {element.sessionType}
                  </li>
                  <li className="flex items-center">
                    <FaClock className="text-blue-500 mr-2" />
                    {element.sessionsPerMonth}
                  </li>
                  <li className="flex items-center">
                    <FaVideo className="text-blue-500 mr-2" />
                    {element.lessonTime}
                  </li>
                  <li className="flex items-center">
                    <FaCertificate className="text-blue-500 mr-2" />
                    {element.trial}
                  </li>
                </ul>

                {/* This is the updated button usage */}
                <button
                  onClick={() => {
                    setSelectedPrice(element.fee);
                    setIsModalOpen(true);
                  }}
                  className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-300"
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <AnimatePresence>
        {isModalOpen && (
          <PaymentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            price={selectedPrice}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
