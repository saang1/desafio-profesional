/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FavoriteToggle from './FavorteToggle';




const ProductCard = ({ product }) => {
  const navigate = useNavigate();


  const handleDetailsClick = () => {
    navigate(`/products/${product.id}`);
  };




  return (
    <Card className="mb-4 mx-2 mt-4 border-0" key={product.id}>
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


        <FavoriteToggle productId={product.id} />

        <Button variant="danger" onClick={handleDetailsClick}>DETAILS</Button>
      </ButtonGroup>
    </Card>
  );
};

export default ProductCard;
