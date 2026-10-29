import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom";

import "./App.css";

// Home Component
function Home() {
  return (
    <div className="content">
      <h3>⌂ Welcome to EduPortal Home</h3>
      <p>
        This single-page layout uses React Router to navigate
        between pages without refreshing the browser.
      </p>
      <div className="notice">
        💡 Notice how the address path updates without page reloads!
      </div>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="content">
      <h3>ⓘ About EduPortal</h3>
      <p>
        EduPortal is an educational platform designed to help
        students learn programming and develop technical skills.
      </p>
      <h4>Our Mission</h4>
      <p>To provide quality education and learning resources.</p>
    </div>
  );
}

// Courses Component
function Courses() {
  return (
    <div className="content">
      <h3>▣ Available Courses</h3>
      <div className="course-list">
        <Link to="/course/101" className="course-card">
          <h4>ReactJS Development</h4>
          <p>Course ID: 101</p>
        </Link>

        <Link to="/course/102" className="course-card">
          <h4>JavaScript Programming</h4>
          <p>Course ID: 102</p>
        </Link>

        <Link to="/course/103" className="course-card">
          <h4>Python Programming</h4>
          <p>Course ID: 103</p>
        </Link>
      </div>
    </div>
  );
}

// Course Detail Component
function CourseDetail() {
  const { id } = useParams();

  const courseNames = {
    101: "ReactJS Development",
    102: "JavaScript Programming",
    103: "Python Programming"
  };

  return (
    <div className="content">
      <h3>📚 Course Details</h3>
      <p><strong>Course ID:</strong> {id}</p>
      <p>
        <strong>Course Name:</strong>{" "}
        {courseNames[id] || "Course not found"}
      </p>
      <Link to="/courses">← Back to Courses</Link>
    </div>
  );
}

// Contact Component
function Contact() {
  return (
    <div className="content">
      <h3>☎ Contact Us</h3>
      <p>Email: support@eduportal.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Location: Tamil Nadu, India</p>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const location = useLocation();

  const links = [
    { path: "/", label: "⌂ Home" },
    { path: "/about", label: "ⓘ About" },
    { path: "/courses", label: "▣ Courses" },
    { path: "/contact", label: "☎ Contact" }
  ];

  return (
    <nav className="navbar">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={
            location.pathname === link.path ? "nav-link active" : "nav-link"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}