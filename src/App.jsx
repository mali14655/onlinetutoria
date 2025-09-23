// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route,Router } from "react-router-dom";
import Home from "./pages/Home";
import FAQs from "./components/FAQs";
import Testimonials from "./components/Testimonials.jsx";
import FeedbackForm from "./components/FeedbackForm";
import Layout from "./components/Layout";
import Contact from "./components/Contact";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  const[tutors,setTutors]=useState([]);

  useEffect(()=>{

    const loadData=async()=>{
      try{
        const Tutors= await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tutors/`,{
          method:"Get"
        })
        const data = await Tutors.json();
        setTutors(data);
        console.log(data);

      }
      catch(err){
        console.log(err)
      }
    }
     loadData(); 
  },[])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home tutors={tutors} />} />
        <Route
          path="testimonials"
          element={<Testimonials  />}
        />
        <Route path="faqs" element={<FAQs />} />
        <Route path="feedback" element={<FeedbackForm />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin tutors={tutors} />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<h1 className="text-center py-20">404 - Page Not Found</h1>}
        />
      </Route>
    </Routes>
  );
}
