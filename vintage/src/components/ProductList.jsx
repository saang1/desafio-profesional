// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ListProducts } from '../services/ProductService';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

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
        const shuffledProducts = shuffleArray(response.data).slice(0, 10);
        setProducts(shuffledProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="text-center mb-4 mt-4">PRODUCTS</h2>
        {products.map((product,) => (
          <Col key={product.id} md={5} className="d-flex justify-content-center mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
