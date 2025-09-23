import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";

const Admin = () => {
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [prices, setPrices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch all data
  const fetchFeedbacks = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/feedback`
    );
    const data = await res.json();
    setFeedbacks(data);
  };

  const fetchTutors = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tutors`);
    const data = await res.json();
    setTutors(data);
  };

  const fetchCourses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/courses`);
    const data = await res.json();
    setCourses(data);
  };

  const fetchPrices = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pricing`);
    const data = await res.json();
    setPrices(data);
  };

  const fetchFaqs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/faqs`);
    const data = await res.json();
    setFaqs(data);
  };

  useEffect(() => {
    fetchTutors();
    fetchCourses();
    fetchPrices();
    fetchFeedbacks();
    fetchFaqs();
  }, []);

  // Form states
  const [priceForm, setPriceForm] = useState({
    frequency: "",
    fee: "",
    sessionType: "",
    sessionsPerMonth: "",
    lessonTime: "",
    trial: "",
  });

  const [tutorForm, setTutorForm] = useState({
    name: "",
    experience: "",
    department: "",
    education: "",
    picture: null,
  });

  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    picture: null,
  });

  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
  });

  // Handle input changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTutorChange = (e) => {
    const { name, value, files } = e.target;
    setTutorForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCourseChange = (e) => {
    const { name, value, files } = e.target;
    setCourseForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFaqChange = (e) => {
    const { name, value } = e.target;
    setFaqForm((prev) => ({ ...prev, [name]: value }));
  };

  // Edit handlers
  const editTutor = (tutor) => {
    setTutorForm({
      name: tutor.name,
      experience: tutor.experience,
      department: tutor.department,
      education: tutor.education,
      picture: null,
    });
    setEditingId(tutor._id);
    setShowTutorForm(true);
  };

  const editCourse = (course) => {
    setCourseForm({
      name: course.name,
      description: course.description,
      picture: null,
    });
    setEditingId(course._id);
    setShowCourseForm(true);
  };

  const editPrice = (price) => {
    setPriceForm({
      frequency: price.frequency,
      fee: price.fee,
      sessionType: price.sessionType,
      sessionsPerMonth: price.sessionsPerMonth,
      lessonTime: price.lessonTime,
      trial: price.trial,
    });
    setEditingId(price._id);
    setShowPriceForm(true);
  };

  const editFaq = (faq) => {
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
    });
    setEditingId(faq._id);
    setShowFaqForm(true);
  };

  // Submit handlers
  const submitTutor = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    // Append all fields except picture
    Object.entries(tutorForm).forEach(([key, value]) => {
      if (key !== "picture" || value !== null) {
        data.append(key, value);
      }
    });

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_BASE_URL}/api/tutors/${editingId}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/tutors`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
      });

      if (!res.ok) throw new Error("Operation failed");
      await res.json();
      fetchTutors();
      setShowTutorForm(false);
      setTutorForm({
        name: "",
        experience: "",
        department: "",
        education: "",
        picture: null,
      });
      setEditingId(null);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Failed to save tutor", "error");
    } finally {
      setLoading(false);
    }
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    Object.entries(courseForm).forEach(([key, value]) => {
      if (key !== "picture" || value !== null) {
        data.append(key, value);
      }
    });

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_BASE_URL}/api/courses/${editingId}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/courses`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
      });

      if (!res.ok) throw new Error("Operation failed");
      await res.json();
      fetchCourses();
      setShowCourseForm(false);
      setCourseForm({ name: "", description: "", picture: null });
      setEditingId(null);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Failed to save course", "error");
    } finally {
      setLoading(false);
    }
  };

  const submitPrice = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_BASE_URL}/api/pricing/${editingId}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/pricing`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(priceForm),
      });

      if (!res.ok) throw new Error("Operation failed");
      await res.json();
      fetchPrices();
      setShowPriceForm(false);
      setPriceForm({
        frequency: "",
        fee: "",
        sessionType: "",
        sessionsPerMonth: "",
        lessonTime: "",
        trial: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Failed to save pricing", "error");
    } finally {
      setLoading(false);
    }
  };

  const submitFaq = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_BASE_URL}/api/faqs/${editingId}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/faqs`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqForm),
      });

      if (!res.ok) throw new Error("Operation failed");
      await res.json();
      fetchFaqs();
      setShowFaqForm(false);
      setFaqForm({ question: "", answer: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Failed to save FAQ", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete handlers
  const deleteItem = async (type, id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete the ${type}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#95a5a6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);
      let endpoint = "";
      let fetchFunction = () => {};

      switch (type) {
        case "tutor":
          endpoint = `tutors/${id}`;
          fetchFunction = fetchTutors;
          break;
        case "course":
          endpoint = `courses/${id}`;
          fetchFunction = fetchCourses;
          break;
        case "price":
          endpoint = `pricing/${id}`;
          fetchFunction = fetchPrices;
          break;
        case "feedback":
          endpoint = `feedback/${id}`;
          fetchFunction = fetchFeedbacks;
          break;
        case "faq":
          endpoint = `faqs/${id}`;
          fetchFunction = fetchFaqs;
          break;
        default:
          throw new Error("Invalid type");
      }

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${endpoint}`, {
        method: "DELETE",
      });

      await fetchFunction();
      Swal.fire("Deleted!", `${type} has been deleted.`, "success");
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", `Failed to delete ${type}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (
      showTutorForm ||
      showCourseForm ||
      showPriceForm ||
      showFaqForm ||
      loading
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCourseForm, showTutorForm, showPriceForm, showFaqForm, loading]);

  return (
    <div className="admin-container p-8 space-y-16">
      {loading && <Loader />}

      <div className="admin-header flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="space-x-3 flex flex-wrap gap-2">
          <button
            className="add-btn bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowTutorForm(true);
              setEditingId(null);
              setTutorForm({
                name: "",
                experience: "",
                department: "",
                education: "",
                picture: null,
              });
            }}
          >
            + Add Tutor
          </button>
          <button
            className="add-btn bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowCourseForm(true);
              setEditingId(null);
              setCourseForm({ name: "", description: "", picture: null });
            }}
          >
            + Add Course
          </button>
          <button
            className="add-btn bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowPriceForm(true);
              setEditingId(null);
              setPriceForm({
                frequency: "",
                fee: "",
                sessionType: "",
                sessionsPerMonth: "",
                lessonTime: "",
                trial: "",
              });
            }}
          >
            + Add Price
          </button>
          <button
            className="add-btn bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowFaqForm(true);
              setEditingId(null);
              setFaqForm({ question: "", answer: "" });
            }}
          >
            + Add FAQ
          </button>
        </div>
      </div>

      {/* Tutor Modal */}
      {showTutorForm && (
        <ModalForm
          title={editingId ? "Edit Tutor" : "Add Tutor"}
          formData={tutorForm}
          onChange={handleTutorChange}
          onSubmit={submitTutor}
          onClose={() => {
            setShowTutorForm(false);
            setEditingId(null);
          }}
          fields={["name", "experience", "department", "education"]}
          fileUpload={true}
          loading={loading}
          editingId={editingId} // Add this line
        />
      )}

      {/* Course Modal */}
      {showCourseForm && (
        <ModalForm
          title={editingId ? "Edit Course" : "Add Course"}
          formData={courseForm}
          onChange={handleCourseChange}
          onSubmit={submitCourse}
          onClose={() => {
            setShowCourseForm(false);
            setEditingId(null);
          }}
          fields={["name", "description"]}
          fileUpload={true}
          loading={loading}
          editingId={editingId} // Add this line
        />
      )}

      {/* Price Modal */}
      {showPriceForm && (
        <ModalForm
          title={editingId ? "Edit Price" : "Add Price"}
          formData={priceForm}
          onChange={handlePriceChange}
          onSubmit={submitPrice}
          onClose={() => {
            setShowPriceForm(false);
            setEditingId(null);
          }}
          loading={loading}
          fields={[
            "frequency",
            "fee",
            "sessionType",
            "sessionsPerMonth",
            "lessonTime",
            "trial",
          ]}
          fileUpload={false}
          editingId={editingId} // Add this line
        />
      )}

      {/* FAQ Modal */}
      {showFaqForm && (
        <ModalForm
          title={editingId ? "Edit FAQ" : "Add FAQ"}
          formData={faqForm}
          onChange={handleFaqChange}
          onSubmit={submitFaq}
          onClose={() => {
            setShowFaqForm(false);
            setEditingId(null);
          }}
          loading={loading}
          fields={["question", "answer"]}
          fileUpload={false}
          textareaFields={["answer"]}
          editingId={editingId} // Add this line
        />
      )}

      {/* Tutors Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Tutors</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[700px] tutors-table">
            <div className="grid grid-cols-7 gap-4 bg-gray-200 p-3 font-semibold">
              <div>Picture</div>
              <div>Name</div>
              <div>Experience</div>
              <div>Department</div>
              <div>Education</div>
              <div>Actions</div>
            </div>
            {tutors.map((tutor) => (
              <div
                className="grid grid-cols-7 gap-4 p-3 items-center border-b"
                key={tutor._id}
              >
                <img
                  src={tutor.picture}
                  alt={tutor.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>{tutor.name}</div>
                <div>{tutor.experience}</div>
                <div>{tutor.department}</div>
                <div>{tutor.education}</div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editTutor(tutor)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteItem("tutor", tutor._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[700px] courses-table">
            <div className="grid grid-cols-5 gap-4 bg-gray-200 p-3 font-semibold">
              <div>Picture</div>
              <div>Name</div>
              <div>Description</div>
              <div>Actions</div>
            </div>
            {courses.map((course) => (
              <div
                key={course._id}
                className="grid grid-cols-5 gap-4 p-3 items-center border-b"
              >
                <div>
                  <img
                    src={course.picture}
                    alt={course.name}
                    className="w-20 h-16 object-cover rounded"
                  />
                </div>
                <div className="font-medium">{course.name}</div>
                <div className="text-sm text-gray-600 truncate">
                  {course.description}
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editCourse(course)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteItem("course", course._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Pricing Plans</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[900px] prices-table">
            <div className="grid grid-cols-8 gap-4 bg-gray-200 p-3 font-semibold">
              <div>Duration</div>
              <div>Fee</div>
              <div>Session Type</div>
              <div>Sessions/Month</div>
              <div>Lesson Time</div>
              <div>Report Type</div>
              <div>Actions</div>
            </div>
            {prices.map((price) => (
              <div
                key={price._id}
                className="grid grid-cols-8 gap-4 p-3 items-center border-b"
              >
                <div>{price.frequency}</div>
                <div>{price.fee}</div>
                <div>{price.sessionType}</div>
                <div>{price.sessionsPerMonth}</div>
                <div>{price.lessonTime}</div>
                <div>{price.trial}</div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editPrice(price)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteItem("price", price._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All FAQs</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[700px] faqs-table">
            <div className="grid grid-cols-4 gap-4 bg-gray-200 p-3 font-semibold">
              <div>Question</div>
              <div>Answer</div>
              <div>Actions</div>
            </div>
            {faqs.map((faq) => (
              <div
                key={faq._id}
                className="grid grid-cols-4 gap-4 p-3 items-center border-b"
              >
                <div className="font-medium">{faq.question}</div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {faq.answer}
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editFaq(faq)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteItem("faq", faq._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All Feedback</h2>
        <div className="overflow-x-auto">
          <div className="min-w-[800px] feedbacks-table">
            <div className="grid grid-cols-5 gap-4 bg-gray-200 p-3 font-semibold">
              <div>Picture</div>
              <div>Name</div>
              <div>Category</div>
              <div>Message</div>
              <div>Actions</div>
            </div>
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="grid grid-cols-5 gap-4 p-3 items-center border-b"
              >
                <div>
                  <img
                    src={fb.picture}
                    alt={fb.fullName}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
                <div>{fb.fullName}</div>
                <div>{fb.category}</div>
                <div className="text-sm text-gray-600 truncate">
                  {fb.message}
                </div>
                <div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteItem("feedback", fb._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Reusable modal form component
const ModalForm = ({
  title,
  formData,
  onChange,
  onSubmit,
  onClose,
  fields,
  fileUpload = true,
  loading,
  textareaFields = [],
  editingId, // Add this prop
}) => (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 h-[100vh]">
    <div
      className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map((field) =>
          textareaFields.includes(field) ? (
            <textarea
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={onChange}
              required
              className="w-full border p-2 rounded min-h-[100px]"
            />
          ) : (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={onChange}
              required
              className="w-full border p-2 rounded"
            />
          )
        )}
        {fileUpload && (
          <div>
            <label className="block mb-2">Picture</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={onChange}
              required={!editingId} // Only required when creating new
              className="w-full"
            />
            {editingId && (
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to keep current picture
              </p>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t-white border-white rounded-full animate-spin mx-auto" />
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Admin;
