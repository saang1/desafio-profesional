// com.vintage.ecommerce.service.FavoritesService
package com.vintage.ecommerce.service;


import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.user.User;

import java.util.List;

public interface FavoritesService {

    void addToFavorites(Long productId, String username);

    void removeFromFavorites(Long productId, String username);

    List<Product> getUserFavorites(String username);  // Return entities here

    boolean isFavorite(User user, Long productId);
}