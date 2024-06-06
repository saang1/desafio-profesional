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
  const [currentIndex, setCurrentIndex] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((product) => {
        setProduct(product);
        if (product.images && product.images.length > 0) {
          setCurrentIndex(0);
        }
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

  const handleImageClick = (index) => {
    setCurrentIndex(index);
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
          {product.images && product.images.length > 0 && (
            <Image
              src={`data:image/png;base64,${product.images[0]}`}
              fluid
              className="img-detail"
              onClick={() => handleImageClick(0)}
              style={{ cursor: 'pointer', objectFit: 'cover', maxHeight: '500px', width: '100%' }}
            />
          )}
          <div className="mt-3 d-flex justify-content-center">
            {product.images && product.images.map((image, index) => (
              <Image
                key={index}
                src={`data:image/png;base64,${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="img-thumbnail mx-2"
                style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </Col>
        <Col md={6} className="d-flex flex-column mb-4">
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
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered dialogClassName="custom-modal">
        <Modal.Body className="custom-modal-body">
          <Carousel activeIndex={currentIndex} onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}>
            {product.images && product.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`data:image/png;base64,${image}`}
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
