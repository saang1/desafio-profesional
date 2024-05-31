// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/ProductService';
import { Container, Row, Col, Image, Button, Modal, Carousel } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((product) => {
        setProduct(product);
        setCurrentImage(product.image); 
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate('/');
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-dark" onClick={handleBackClick} className="text-decoration-none">
            <ArrowLeft size={50} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Image
            src={`data:image/png;base64,${product.image}`}
            fluid
            className="img-detail"
            onClick={() => handleImageClick(product.image)}
            style={{ cursor: 'pointer' }}
          />
          <div className="mt-3 d-flex justify-content-center">
            {[...Array(4)].map((_, index) => (
              <Image
                key={index}
                src={`data:image/png;base64,${product.image}`}
                alt={`Thumbnail ${index + 1}`}
                className="img-thumbnail mx-1"
                style={{ width: '80px', cursor: 'pointer' }}
                onClick={() => handleImageClick(product.image)}
              />
            ))}
          </div>
        </Col>
        <Col md={6} className="d-flex flex-column mb-5">
          <div className="flex-grow-1">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h3>${product.price}</h3>
          </div>
          <Button variant="danger" className="btn-cart mb-5">
            Add to Cart
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Body>
          <Carousel activeIndex={0}>
            {[...Array(4)].map((_, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`data:image/png;base64,${currentImage}`}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
