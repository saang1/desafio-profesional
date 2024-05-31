// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { ListProducts } from '../services/ProductService';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const productListRef = useRef(null); 

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    ListProducts()
      .then((response) => {
        const shuffledProducts = shuffleArray(response.data);
        setProducts(shuffledProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Scroll to the start of the product list
  const scrollToProductList = () => {
    productListRef.current.scrollIntoView({ behavior: 'smooth' });
  };  

  
  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToProductList();
  };


  // Total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);  

  return (
    <Container className='products mt-5' id="products" ref={productListRef}>
      <Row className="justify-content-center">
        <h2 className="text-center mb-3 mt-5">PRODUCTS</h2>
        {currentProducts.map((product) => (
          <Col key={product.id} md={5} className="d-flex justify-content-center mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Pagination  size="lg" className="d-flex justify-content-center pagination-dark">
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )).slice(0, 5)} {/* Display only first 5 page buttons */}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
        <span className="d-flex justify-content-center mx-2">Page {currentPage} of {totalPages}</span>
      </Row>
    </Container>
  );
};


export default ProductList;
