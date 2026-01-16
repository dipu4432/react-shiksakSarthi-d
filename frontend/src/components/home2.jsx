import interior1 from '/interiors/design-possibilities-home-interiors.png';
import interior2 from '/interiors/top-interior-designers.png';
import interior3 from '/interiors/low-cost-interiors.png';
import interior4 from '/interiors/warranty-home-interiors.png';

const Home2 = () => {
  return (
    <div className="container text-center mt-5">
      <h2>Why Choose Colours Kitchen Gallery ?</h2>

      <div className="row m-4 gy-4">
        
        <div className="col-6 col-md-3">
          <img src={interior1} width={100} height={100} alt="Design Possibilities" />
          <p>51040 Design Possibilities</p>
        </div>

        <div className="col-6 col-md-3">
          <img src={interior2} width={100} height={100} alt="Extra Storage" />
          <p>20% EXTRA Storage</p>
        </div>

        <div className="col-6 col-md-3">
          <img src={interior3} width={100} height={100} alt="Low Cost EMIs" />
          <p>No Cost EMIs</p>
        </div>

        <div className="col-6 col-md-3">
          <img src={interior4} width={100} height={100} alt="Warranty" />
          <p>Upto 25 years Warranty</p>
        </div>

      </div>
    </div>
  )
}

export default Home2;
