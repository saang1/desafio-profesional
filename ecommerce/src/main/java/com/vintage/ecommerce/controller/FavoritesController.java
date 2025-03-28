package com.vintage.ecommerce.controller;

import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.mapper.ProductMapper;
import com.vintage.ecommerce.service.FavoritesService;
import com.vintage.ecommerce.service.UserService;
import com.vintage.ecommerce.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoritesController {

    private final FavoritesService favoritesService;

    @PostMapping("/{productId}")
    public ResponseEntity<Void> addFavorite(
            @PathVariable Long productId,
            Authentication authentication
    ) {
        favoritesService.addToFavorites(productId, authentication.getName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFavorite(
            @PathVariable Long productId,
            Authentication authentication
    ) {
        favoritesService.removeFromFavorites(productId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getFavorites(Authentication authentication) {
        List<Product> products = favoritesService.getUserFavorites(authentication.getName());
        List<ProductDto> dtos = products.stream()
                .map(ProductMapper::mapToProductDto)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<?> checkFavoriteStatus(
            @PathVariable Long productId,
            Authentication authentication
    ) {
        User user = UserService.getAuthenticatedUser(authentication);
        boolean isFavorite = favoritesService.isFavorite(user, productId);
        return ResponseEntity.ok(Collections.singletonMap("isFavorite", isFavorite));
    }


}