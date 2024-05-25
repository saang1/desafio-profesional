import { useState } from 'react';
import { createProduct } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const NewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    name:'',
    description:'',
    price:'',
    image:''
  });
  const navigator = useNavigate();

  function saveProduct(e) {
    e.preventDefault();
  
    if(validateForm()){
      const productData = {
        name: name,
        description: description,
        price: price
      };
    
      createProduct(productData, image) 
        .then((response) => {
          console.log('Product created successfully:', response.data);
          navigator('/administrator');
        })
        .catch((error) => {
          console.error('Error creating product:', error);
        });
    }
  }

  function validateForm(){
    let valid = true;
    const errorsCopy = {... errors};

    if(name.trim()){
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }
    if(description.trim()){
      errorsCopy.description = '';
    } else {
      errorsCopy.description = 'Description is required';
      valid = false;
    }
    if(price.trim()){
      errorsCopy.price = '';
    } else {
      errorsCopy.price = 'Price is required';
      valid = false;
    }
    if(image){
      errorsCopy.image = '';
    } else {
      errorsCopy.image = 'Image is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  return (
    <Container className="container mt-5">
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
                      isInvalid={errors.name}
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
                      isInvalid={errors.description}
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
                      isInvalid={errors.price}
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formProductImage">
                  <Form.Label column sm={4} className="form-label">Image</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      isInvalid={errors.image}
                    />
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.image}
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
