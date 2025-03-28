/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  getAvailableDates,
  createReservation,
} from "../services/ProductService";
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
import { isLoggedIn } from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const ProductDetailPage = () => {
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

  const today = new Date(); // Today's date to restrict past selections

  const normalizeDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  };


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);

        const fetchedDates = await getAvailableDates(id);

setAvailableDates(
  fetchedDates
    .filter((date) => {
      const startDate = new Date(date.startDate);
      const endDate = new Date(date.endDate);
      // Exclude invalid ranges where startDate > endDate
      if (startDate > endDate) {
        console.warn("Invalid date range:", date);
        return false;
      }
      return true;
    })
    .flatMap((date) => {
      const startDate = normalizeDate(date.startDate);
      const endDate = normalizeDate(date.endDate);
      const dates = [];
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d)); // Clone the date
      }
      return dates;
    })
);

setReservedDates(
  fetchedDates
    .filter((date) => {
      const startDate = new Date(date.startDate);
      const endDate = new Date(date.endDate);
      // Exclude invalid ranges where startDate > endDate
      if (startDate > endDate) {
        console.warn("Invalid date range:", date);
        return false;
      }
      return true;
    })
    .flatMap((date) => {
      const startDate = normalizeDate(date.startDate);
      const endDate = normalizeDate(date.endDate);
      const dates = [];
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d)); // Clone the date
      }
      return dates;
    })
);

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
    const normalizedDate = normalizeDate(date);

    // Check if the date is reserved
    if (
      reservedDates.some(
        (d) => normalizeDate(d).getTime() === normalizedDate.getTime()
      )
    ) {
      return "reserved";
    }

    // Check if the date is available
    if (
      availableDates.some(
        (d) => normalizeDate(d).getTime() === normalizedDate.getTime()
      )
    ) {
      return "available";
    }




    return "";
  };

  const handleReservation = async () => {
    if (!isLoggedIn()) {
      toast.error("You must be logged in to make a reservation.");
      return;
    }

    if (!startDate || !endDate) {
      toast.warn(
        "Please select both start and end dates for your reservation."
      );
      return;
    }

    // Ensure the selected dates are not in the past
    if (startDate < today || endDate < today) {
      toast.error("You cannot reserve dates in the past.");
      return;
    }

    try {
      const reservationData = {
        productId: id,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
      };

      await createReservation(reservationData);
      toast.success("Reservation successful!");

      // Refresh dates after successful reservation
      const fetchedDates = await getAvailableDates(id);
      setAvailableDates(
        fetchedDates
          .filter((date) => date.status === "available")
          .map((date) => new Date(date.date))
      );
      setReservedDates(
        fetchedDates
          .filter((date) => date.status === "reserved")
          .map((date) => new Date(date.date))
      );
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error(
        "This product is already reserved. Please try again with a different date."
      );
    }
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
              onClick={handleReservation}
            >
              Reserve Now
            </Button>
            <Row>
              <Col className="mt-5">
                <Form.Group className="d-flex justify-content-evenly">
                  <div>
                    <h6>Start Date</h6>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={today}
                      highlightDates={[
                        { dates: availableDates, className: "available" },
                        { dates: reservedDates, className: "reserved" },
                      ]}
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
                      minDate={startDate || today} // End date can't be earlier than start date
                      dayClassName={handleDateClassName}
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
      <ToastContainer />
    </Container>
  );
};

export default ProductDetailPage;
