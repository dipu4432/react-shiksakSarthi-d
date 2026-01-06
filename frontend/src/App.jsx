/*
import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Upload from './pages/Upload'
import Front from './components/front'
// import './App.css'
import Footer from './components/footer'
import Navigation from './components/navigation'
import ConsultationForm from "./components/consultationForm.jsx";


function App() {
   // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);

  // OPEN POPUP METHOD (will be sent to Navbar)
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

  return (
    <div>
      <nav>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/front" style={{ marginLeft: 12 }}>Front</Link>
      </nav>
      <Navigation onQuoteClick={openPopup} />
*/
      {/* <main style={{ padding: 12 }}> */}
/*      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/front" element={<Front />} />
        </Routes>
      </main>
      <Footer />
      */
      {/* POPUP OVERLAY */}
 /*     {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "90%", paddingTop: "90px", maxWidth: "600px" }}
          >
            <button className="btn-close float-end" onClick={closePopup}></button>
            <ConsultationForm />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
*/

import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
// import Home from './home/Home'
import Upload from './pages/Upload'
// import Login from './pages/Login'
// import Register from './pages/Register'
import { getUser, clearAuth, getToken } from './lib/auth'
// import './App.css'

import Front from './components/front'
import Navigation from './components/navigation'
import Footer from './components/footer'
import ConsultationForm from "./components/consultationForm.jsx";

const API = import.meta.env.VITE_API_URL || 'https://react-shiksak-sarthi-d.vercel.app'

function App() {
  const [user, setUser] = useState(getUser())
  const navigate = useNavigate()
  
  // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);

  // OPEN POPUP METHOD (will be sent to Navbar)
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  async function handleLogout() {
    try {
      const token = getToken()
      if (token) {
        await fetch(`${API}/api/auth/logout`, { // || 'http://localhost:5173'}/api/auth/logout, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        })
      }
    } catch (err) {
      // ignore logout network errors
      console.error('Logout error', err)
    }
    clearAuth()
    setUser(null)
    navigate('/')
  }

  return (
    <div>
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
      <Navigation onQuoteClick={openPopup} />

      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Front />} />
          {/* <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
          <Route path="/register" element={<Register onRegister={(u) => setUser(u)} />} /> */}
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
            <button className="btn-close float-end" onClick={closePopup}></button>
            <ConsultationForm onSuccess={closePopup} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App