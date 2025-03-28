package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.entity.UserFavorites;
import com.vintage.ecommerce.repository.UserFavoritesRepository;
import com.vintage.ecommerce.service.FavoritesService;
import com.vintage.ecommerce.service.ProductService;
import com.vintage.ecommerce.service.UserService;
import com.vintage.ecommerce.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoritesServiceImpl implements FavoritesService {

    private final UserFavoritesRepository favoritesRepo;
    private final UserService userService;
    private final ProductService productService;

    @Override
    @Transactional
    public void addToFavorites(Long productId, String username) {
        User user = userService.getUserByUsername(username);

        Product product = productService.getProductEntityById(productId);

        // Verify entities are properly loaded
        if (user.getId() == null || product.getId() == null) {
            throw new IllegalStateException("User or Product not persisted");
        }

        if (!favoritesRepo.existsByUserAndProduct(user, product)) {
            UserFavorites fav = new UserFavorites(user, product);
            favoritesRepo.save(fav);
        }
    }



    @Override
    @Transactional
    public void removeFromFavorites(Long productId, String username) {
        User user = userService.getUserByUsername(username);
        Product product = productService.getProductEntityById(productId);
        favoritesRepo.deleteByUserAndProduct(user, product);
    }

    @Override
    public List<Product> getUserFavorites(String username) {
        User user = userService.getUserByUsername(username);
        return favoritesRepo.findFavoriteProductsByUser(user);
    }

    @Override
    public boolean isFavorite(User user, Long productId) {
        return false;
    }
}