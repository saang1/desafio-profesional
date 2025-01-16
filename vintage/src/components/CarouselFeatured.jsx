// eslint-disable-next-line no-unused-vars
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import camera_featured from '../components/assets/camera-featured.jpg'
import lens_featured from '../components/assets/lens-featured.jpg'
import video_featured from '../components/assets/video-featured.jpg'




const CarouselFeatured = () => {
  return (
    <Carousel interval={2500}>
      <Carousel.Item>
        <img
            className='d-block '
            src={camera_featured} 
            alt="Camera Kodak" 
        />
        <Carousel.Caption>
          
          <p>Kodak Instamatic 133</p>
          <button>Explore More</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className='d-block '
            src={lens_featured} 
            alt="Camera Kodak" 
        />
        <Carousel.Caption>
          
          <p>Fotasy Lens ANAF Sony Minolta</p>
          <button>Explore More</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
            className='d-block '
            src={video_featured} 
            alt="Camera Kodak" 
        />
        <Carousel.Caption>
          
          <p>RED Epic Dragon</p>
          <button>Explore More</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselFeatured