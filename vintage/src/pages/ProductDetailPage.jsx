/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getAvailableDates } from "../services/ProductService";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Carousel,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);

        const fetchedDates = await getAvailableDates(id);
        setAvailableDates(fetchedDates.filter(date => date.status === 'available').map(date => new Date(date.date)));
        setReservedDates(fetchedDates.filter(date => date.status === 'reserved').map(date => new Date(date.date)));

        setLoading(false);
        if (fetchedProduct?.images?.length > 0) {
          setCurrentIndex(0);
        }
      } catch (error) {
        setError("Error fetching product or available dates.");
        setLoading(false);
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateClassName = (date) => {
    // Check if the date is in available or reserved dates
    if (availableDates.some(d => d.toDateString() === date.toDateString())) {
      return "available"; // For available dates
    }
    if (reservedDates.some(d => d.toDateString() === date.toDateString())) {
      return "reserved"; // For reserved dates
    }
    return ""; // Default class for non-highlighted dates
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <Button
            variant="outline-dark"
            onClick={handleBackClick}
            className="text-decoration-none"
          >
            <ArrowLeft size={24} /> Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {product?.images?.length > 0 ? (
            <Image
              src={`data:image/png;base64,${product.images[0]}`}
              fluid
              className="img-detail"
              onClick={() => handleImageClick(0)}
              style={{
                cursor: "pointer",
                objectFit: "cover",
                maxHeight: "500px",
                width: "100%",
              }}
              alt="Product Image"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/500"
              fluid
              className="img-detail"
              style={{ objectFit: "cover", maxHeight: "500px", width: "100%" }}
              alt="Placeholder Image"
            />
          )}

          <div className="mt-3 d-flex justify-content-center">
            {product?.images?.map((image, index) => (
              <Image
                key={index}
                src={`data:image/png;base64,${image}`}
                alt={`Thumbnail ${index + 1}`}
                className="img-thumbnail mx-2"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </Col>
        <Col md={6} className="d-flex flex-column">
          <div className="flex-grow-1">
            <h1>{product?.name || "Product Name Unavailable"}</h1>
            <p>{product?.description || "No description available."}</p>
            <h3>${product?.price?.toFixed(2) || "N/A"}</h3>
            <h5>Reservation:</h5>
          </div>
          <Row className="mt-3 ms-1 align-items-center">
            <Button
              variant="danger"
              className="btn-cart"
              onClick={() =>
                alert(
                  `Reserved from ${startDate?.toLocaleDateString()} to ${endDate?.toLocaleDateString()}`
                )
              }
            >
              Reserve Now
            </Button>
            <Row>
              <Col className="mt-5">
                <Form.Group className="d-flex justify-content-evenly ">
                  <div>
                    <h6>Start Date</h6>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dayClassName={handleDateClassName} // Apply custom classes
                      inline
                    />
                  </div>
                  <div>
                    <h6>End Date</h6>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dayClassName={handleDateClassName} // Apply custom classes
                      inline
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Row>
        </Col>
      </Row>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Body className="custom-modal-body">
          <Carousel
            activeIndex={currentIndex}
            onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
          >
            {product?.images?.map((image, index) => (
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
