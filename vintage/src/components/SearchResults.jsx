/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const query = searchParams.get('query');

  useEffect(() => {
    const controller = new AbortController();

    const fetchSearchResults = async () => {
      try {
        setError(null); 
        const response = await axios.get(
          `http://localhost:8080/api/products/search?query=${query}`,
          { signal: controller.signal }
        );
        setProducts(response.data);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error('Error fetching search results:', err);
          setError('Failed to fetch search results.');
        }
      }
    };

    if (query) {
      fetchSearchResults();
    }

    return () => controller.abort(); 
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="product-list-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-list-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
