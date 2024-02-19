import { useNavigate } from 'react-router-dom';
import './Home.css';
import Nav from './Nav';
import Footer from './Footer';


function App() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));

  return (
    <div>
      <Nav />
      <div className='cnt'>
        {!user ? (
          <div className='all'>
            <h2 style={{ fontSize: 'x-large', color: 'azure' }}>
              To place An Order For The Product
            </h2>
            <div className="button-container">
              <button
                onClick={() => navigate('/product')}
                style={{ backgroundColor: 'rgb(134, 160, 172)' }}
                className="btn btn-primary btn-sm logout-button border-0"
              >
                Start view product
              </button>
              <button
                onClick={() => navigate('/login')}
                style={{ backgroundColor: 'rgb(134, 160, 172)' }}
                className="btn btn-primary btn-sm logout-button border-0"
              >
                Depose product
              </button>
            </div>
          </div>
        ) : (
          <div className='all'>
            <h2 style={{ fontSize: 'x-large', color: 'azure' }}>
              To place An Order For The Product
            </h2>
            <div className="button-container">
              <button
                onClick={() => navigate('/product')}
                style={{ backgroundColor: 'rgb(134, 160, 172)' }}
                className="btn btn-primary btn-sm logout-button border-0"
              >
                Start view product
              </button>
              <button
                onClick={() => navigate('/ajouter')}
                style={{ backgroundColor: 'rgb(134, 160, 172)' }}
                className="btn btn-primary btn-sm logout-button border-0"
              >
                Depose product
              </button>
            </div>
          </div>
        )}
      </div><br/><br/><br/>
      <div className='addUp'>
      <div className="imgHH">
      <img src="/images/home3.jpg" alt=""  />
       </div>
       <div className='txtIM'>
        <h2>
          We Create This To Sales Facilitation
        </h2>
        <p>
        We've crafted this platform with one goal: to streamline your sales process. <br/>
        With intuitive design and powerful features, we empower your team to close deals efficiently.<br/>
         Say goodbye to sales friction and hello to seamless transactions. Experience the difference in sales facilitation today. <br/>
        Elevate your business with our tailored solution
        </p>

       </div>


      </div>
      <div className='container'>
        <h1 className='text'>Services</h1>
        <div className='row'>
          <div className='col-4 div1'>
            <h3>Sale</h3>
          </div>
          <div className='col-4 div2'>
            <h3>Buy</h3>
          </div>
          <div className='col-4 div3'>
            <h3>Cash on Delivery</h3>
          </div>
        </div>
      </div><br/><br/><br/>


      <div className='join'>
        <div>
          <h1>Join us</h1>
          <h5>Join our community today and unlock a world of opportunities.</h5>
          <button 
          onClick={() => navigate('/login')}
          
          >Start with us</button>
        </div>

      </div>
 

      <br /><br/><br/>
      <Footer />
    </div>
  );
}

export default App;
