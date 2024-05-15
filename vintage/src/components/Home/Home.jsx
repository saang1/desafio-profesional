import './Home.css'
import camera from '../assets/cameraAE-1.png'


const Home = () => {
  return (
    
    <div className="products">
      <p>Cameras</p>
      <div className="product-container">
        <div className="images">
          <img src={camera} alt="" />
        </div>
        <div className="info-product">
          <p>$179.00</p>
          <p>Vintage Canon <br />AE-1</p>
          <button>Explore Now</button>
          <ul>
            <li>Classic mechanical canon ae-1 program camera body</li>
            <li>Led light meter display</li>
            <li>Compatible with all canon fd lenses</li>
            <li>This camera comes with a canon fd 50mm f/1.8 lens</li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Home