/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card className="mb-4 mx-2 mt-4 border-0" key={product.id}>
      {product.image && (
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${product.image}`}
          alt={product.name}
          className="product-image"
        />
      )}
      <Card.Body>
        <Card.Title>
          <h3 className='text-center mt-4'>{product.name}</h3>
        </Card.Title>
        <Card.Text>
          <strong>
            <p className='text-center mt-5'>
              ${product.price}
            </p>
          </strong>
        </Card.Text>
      </Card.Body>
      <ButtonGroup size="lg" className='button-group'>
          <Button variant="danger">ADD TO CART</Button>
          <Button variant="danger">DETAILS</Button>
      </ButtonGroup>
    </Card>
  );
};

export default ProductCard;
