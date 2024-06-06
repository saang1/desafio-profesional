import { useState,  } from 'react';
import { createProduct } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    images: ''
  });
  const navigate = useNavigate();


  function saveProduct(e) {
    e.preventDefault();

    if (validateForm()) {
      const productData = {
        name: name,
        description: description,
        price: price,
      };


      createProduct(productData, images) 
        .then((response) => {
          console.log('Product created successfully:', response.data);
          navigate('/admin-list-product');
        })
        .catch((error) => {
          console.error('Error creating product:', error);
        });
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }
    if (description.trim()) {
      errorsCopy.description = '';
    } else {
      errorsCopy.description = 'Description is required';
      valid = false;
    }
    if (price.trim()) {
      errorsCopy.price = '';
    } else {
      errorsCopy.price = 'Price is required';
      valid = false;
    }
    if (images.length > 0) {
      errorsCopy.images = '';
    } else {
      errorsCopy.images = 'At least one image is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  const handleBackClick = () => {
    navigate('/admin-list-product');
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <Container className="new-product mt-5 mb-5 ">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-dark" onClick={handleBackClick} className="text-decoration-none">
            <ArrowLeft size={50} />
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">New Product</h2>
            </div>
            <div className="form-body mt-4">
              <Form onSubmit={saveProduct}>
                <Form.Group as={Row} className="mb-3" controlId="formProductName">
                  <Form.Label column sm={4} className="form-label">Name</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formProductDescription">
                  <Form.Label column sm={4} className="form-label">Description</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formProductPrice">
                  <Form.Label column sm={4} className="form-label">Price</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      placeholder="Enter Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      step="0.01"
                      min="0"
                      isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formProductImages">
                  <Form.Label column sm={4} className="form-label">Images</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple
                      isInvalid={!!errors.images}
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.images}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 8, offset: 4 }}>
                    <Button type="submit" variant="success" className="submit-btn">Submit</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProduct;
