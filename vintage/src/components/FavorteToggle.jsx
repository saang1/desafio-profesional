/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { favoritesService } from '../services/favoritesService';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'; // Import heart icons

const FavoriteToggle = ({ productId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await favoritesService.checkFavoriteStatus(productId);
        setIsFavorite(status);
      } catch (error) {
        console.error('Favorite check failed:', error);
      }
    };
    checkStatus();
  }, [productId]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(productId);
      } else {
        await favoritesService.addFavorite(productId);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Toggle failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isFavorite ? 'warning' : 'outline-secondary'}
      onClick={handleToggle}
      disabled={loading}
      className="favorite-toggle"
    >
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : isFavorite ? (
        <BsFillHeartFill style={{ marginRight: '5px' }} />
      ) : (
        <BsHeart style={{ marginRight: '5px' }} />
      )}
    </Button>
  );
};

export default FavoriteToggle