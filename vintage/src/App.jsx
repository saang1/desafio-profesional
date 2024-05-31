import './App.css'
import Navbar from './components/Navbar.jsx'
import CarouselFeatured from './components/CarouselFeatured.jsx'
import Categories from './components/Categories.jsx'
import ProductList from './components/ProductList.jsx'
import Footer from './components/Footer.jsx'


function App() {

  return (
    <>
      <Navbar/>
      <CarouselFeatured/>
      <Categories/>
      <span></span>
      <ProductList/>
      <Footer/>
    </>
  )
}

export default App
