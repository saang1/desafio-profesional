import { useEffect, useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Spinner, 
  Alert, 
  Card, 
  Button, 
  ButtonGroup, 
  Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { favoritesService } from "../services/favoritesService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await favoritesService.getFavorites();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const handleRemoveClick = (productId) => {
    setProductToRemove(productId);
    setShowModal(true);
  };

  const confirmRemove = async () => {
    try {
      await favoritesService.removeFavorite(productToRemove);
      setFavorites((prev) => prev.filter((p) => p.id !== productToRemove));
      toast.success("Product removed from favorites successfully!");
    } catch (err) {
      toast.error("Failed to remove product from favorites");
    } finally {
      setShowModal(false);
      setProductToRemove(null);
    }
  };

  const handleDetailsClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <ToastContainer />
      
      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this item from your favorites?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 className="text-center mb-4">Your Favorites</h2>
      <Row className="g-4">
        {favorites.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            lg={4}
            className="mb-4 d-flex"
          >
            <Card className="mb-4 mx-2 mt-4 border-0">
              {product.images && product.images.length > 0 && (
                <Card.Img
                  variant="top"
                  src={`data:image/png;base64,${product.images[0]}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <Card.Body>
                <Card.Title>
                  <h3 className="text-center mt-4'">{product.name}</h3>
                </Card.Title>
                <Card.Text>
                  <strong>
                    <p className="text-center mt-5">${product.price}</p>
                  </strong>
                </Card.Text>
              </Card.Body>
              <ButtonGroup size="lg" className="button-group">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveClick(product.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDetailsClick(product.id)}
                >
                  Details
                </Button>
              </ButtonGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;