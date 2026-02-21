
const CallToAction = ({ onQuoteClick }) => {
  return (
    <div className="bg-light text-center mt-3">
        <h2>Ready To Design Your Dream Home ?</h2>
        <p>Book A Free Design Consultation With Our Expert Designers</p>
        <div className="container mt-4 pb-4">
          <button onClick={onQuoteClick} className="btn btn-danger">Get Free Quote</button>
        </div>
    </div>
  )
}

export default CallToAction