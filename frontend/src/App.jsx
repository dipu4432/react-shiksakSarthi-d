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

  return (
    <div>
      <nav>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <Navigation onQuoteClick={openPopup} />

      {/* <main style={{ padding: 12 }}> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/front" element={<Front />} />
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
            <ConsultationForm />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
