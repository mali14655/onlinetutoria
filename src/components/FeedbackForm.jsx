import React, { useState } from "react";
import Loader from "../pages/Loader";

const FeedbackForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    category: "Student",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    document.body.style.overflow = "hidden";

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("category", formData.category);
    data.append("message", formData.message);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/feedback`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        let errorMessage = "Something went wrong";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Ignore
        }
        throw new Error(errorMessage);
      }

      const result = await res.json();
      console.log("Feedback submitted:", result);
      setFormData({
        fullName: "",
        category: "Student",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting feedback:", err.message);
    } finally {
      setLoading(false);
      document.body.style.overflow = "";
    }
  };

  return (
    <div className="w-full px-5 md:px-0">
      {loading && <Loader />}
      <div className="w-full max-w-2xl mx-auto mt-5 p-6 mb-10 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Student">Student</option>
              <option value="Trainer">Trainer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your feedback..."
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
