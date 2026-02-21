import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
// import Home from './home/Home'
import Upload from "./pages/Upload";
// import Login from './pages/Login'
// import Register from './pages/Register'
import { getUser, clearAuth, getToken } from "./lib/auth";
// import './App.css'

import Home from "./components/home";
import SecondFront from "./components/secondFront";
import NavBar from "./components/navBar.jsx";
import Footer from "./components/footer";
import ConsultationForm from "./components/consultationForm.jsx";
import DesignDetails from "./designIdeas/template/designDetails.jsx";

import Press from "./components/press.jsx";
import RAF from "./components/referAFriend.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import Policies from "./components/policies.jsx";
import Magazine from "./components/Magazine.jsx";
import Story from "./components/Story.jsx";
import ProjectPage from "./components/ProjectPage.jsx";
import ProjectDetailPage from "./components/ProjectDetailPage.jsx";
import TurnkeyProject from "./components/turnkeyProject";
import ConstructionServices from "./components/constructionServices";

const API =
  import.meta.env.VITE_API_URL || "https://react-shiksak-sarthi-d.vercel.app";

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);

  // OPEN POPUP METHOD (will be sent to Navbar)
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  async function handleLogout() {
    try {
      const token = getToken();
      if (token) {
        await fetch(`${API}/api/auth/logout`, {
          // || 'http://localhost:5173'}/api/auth/logout, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      // ignore logout network errors
      console.error("Logout error", err);
    }
    clearAuth();
    setUser(null);
    navigate("/");
  }

  return (
    <div className="text-bg-light">
      {/* <nav style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to="/" style={{ marginRight: 12 }}>Home</Link>
          <Link to="/upload" style={{ marginRight: 12 }}>Upload</Link>
          <Link to="/front">Front</Link>
        </div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
              <button onClick={handleLogout} style={{ padding: '6px 10px', borderRadius: 6 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav> */}
      <NavBar onQuoteClick={openPopup} />

      <main style={{ paddingTop: "60px" }}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Home onQuoteClick={openPopup} />} />
          <Route path="/secondFront/:designType" element={<SecondFront onQuoteClick={openPopup} />} />
          <Route
            path="/designDetails/:pageKey/:imageId"
            element={<DesignDetails onQuoteClick={openPopup} />}
          />
          <Route path="/magazine" element={<Magazine />} />

          <Route path="/story" element={<Story />} />

          <Route path="/project" element={<ProjectPage />} />

          <Route path="/project-details/:id" element={<ProjectDetailPage />} />
          {/* <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
          <Route path="/register" element={<Register onRegister={(u) => setUser(u)} />} /> */}
          <Route path="/press" element={<Press />} />
          <Route path="/refer-a-friend" element={<RAF />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/turnkey-project" element={<TurnkeyProject />} />
          <Route path="/construction-services" element={<ConstructionServices />} />

        </Routes>
      </main>
      <Footer />
      {/* POPUP OVERLAY */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "90%", paddingTop: "90px", maxWidth: "600px" }}
          >
            <button
              className="btn-close float-end"
              onClick={closePopup}
            ></button>
            <ConsultationForm onSuccess={closePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
