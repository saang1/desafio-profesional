// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import image1 from "../components/assets/lens-featured.jpg";
import image2 from "../components/assets/video-featured.jpg";
import image3 from "../components/assets/camera-categories.jpg";


const Categories = () => {
  return (
      <Container className="categories-grid" id="categories">
        <Row className="justify-content-center">
          <h2 className="text-center mb-3 mt-5">CATEGORIES</h2>
        </Row>
        <Row className="justify-content-center align-items-stretch"> 
          <Col md={6} className="left-column d-flex flex-column justify-content-center">
            <div className="image-wrapper">
              <img src={image1} alt="Category 1" className="img-fluid mb-3" style={{ width: '695px', height: '276px' }}/>
              <div className="overlay">
                <h3 className="text-center mb-3">Lens</h3>
                <Button variant="primary" className="btn-shop-now mx-auto">Shop Now</Button>
              </div>
            </div>
            <div className="image-wrapper">
              <img src={image2} alt="Category 2" className="img-fluid" style={{ width: '693px', height: '329px' }} />
              <div className="overlay">
                <h3 className="text-center mb-3">Video</h3> 
                <Button variant="primary" className="mx-auto">Shop Now</Button>
              </div>
            </div>
          </Col>
          <Col md={4} className="right-column d-flex align-items-center justify-content-center"> 
            <div className="image-wrapper">
              <img src={image3} alt="Category 3" className="img-fluid" style={{ width: '358px', height: '621px' }}/>
              <div className="overlay">
                <h3 className="text-center mb-3">Cameras</h3> 
                <Button variant="primary" className="mx-auto">Shop Now</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default Categories;