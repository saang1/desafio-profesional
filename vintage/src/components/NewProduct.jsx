import { useEffect, useState } from 'react';
import { createProduct, getProduct, updateProduct } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);

  const { id } = useParams();
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    images: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProduct(id).then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setPrice(response.data.price);
        setFetchedImages(response.data.images || []); // Assuming images are stored in response.data.images
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id]);

  const saveOrUpdateProduct = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const productData = {
        name: name,
        description: description,
        category: category,
        price: price,
      };

      if (id) {
        updateProduct(id, productData, images).then((response) => {
          console.log('Product edited successfully:', response.data);
          navigate('/admin-list-product');
        }).catch(error => {
          console.error('Error editing product:', error);
        });
      } else {
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
  };

  const validateForm = () => {
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
    if (category) {
      errorsCopy.category = '';
    } else {
      errorsCopy.category = 'Category is required';
      valid = false;
    }
    if (price) {
      errorsCopy.price = '';
    } else {
      errorsCopy.price = 'Price is required';
      valid = false;
    }
    if (images.length > 0 || fetchedImages.length > 0) {
      errorsCopy.images = '';
    } else {
      errorsCopy.images = 'At least one image is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  };

  const handleBackClick = () => {
    navigate('/admin-list-product');
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="form-title">Edit Product</h2>;
    } else {
      return <h2 className="form-title">New Product</h2>;
    }
  };

  return (
    <Container className="new-product mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="form-container">
            <div className="form-header">
              {pageTitle()}
            </div>
            <div className="form-body mt-4">
              <Form onSubmit={saveOrUpdateProduct}>
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

                <Form.Group as={Row} className="mb-3" controlId="formProductCategory">
                  <Form.Label column sm={4} className="form-label">Category</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      isInvalid={!!errors.category}
                    >
                      <option value="">Select a category</option>
                      <option value="Camera">Camera</option>
                      <option value="Lens">Lens</option>
                      <option value="Video Camera">Video Camera</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">
                      {errors.category}
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
                    <div className="mt-3">
                      {fetchedImages.map((image, index) => (
                        <img key={index} src={image} alt={`Product image ${index + 1}`} style={{ width: '100px', marginRight: '10px' }} />
                      ))}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                  <Col sm={{ span: 8, offset: 5 }}>
                    <Button type="submit" variant="success" className="submit-btn" size="lg">Submit</Button>
                    <Button onClick={handleBackClick} type="cancel" variant="danger" className="submit-btn" size="lg">Cancel</Button>
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
