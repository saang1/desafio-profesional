import { ListProducts, deleteProduct } from '../services/ProductService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';

const AdminListProduct = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    ListProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  };

  const addNewProduct = () => {
    navigate('/new-product');
  };

  const handleDeleteProduct = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDeleteProduct = () => {
    deleteProduct(selectedProductId)
      .then(() => {
        getAllProducts();
        setShowModal(false);
      })
      .catch((error) => {
        console.log("Error deleting product: ", error);
      });
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Inventory</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Button className="btn btn-primary mb-2" onClick={addNewProduct}>
            Add Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Category</th>
                <th>Product Image</th>
                <th>Product Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={`data:image/png;base64,${product.images[0]}`}
                        alt={product.name}
                        style={{ maxWidth: '100px' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>${product.price}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminListProduct;
