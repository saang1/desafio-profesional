package com.vintage.ecommerce.repository;


import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.UserFavorites;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.entity.id.UserProductId;
import com.vintage.ecommerce.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface UserFavoritesRepository extends JpaRepository<UserFavorites, UserProductId> {

    // Check if favorite exists
    boolean existsByUserAndProduct(User user, Product product);

    // Remove by user and product
    void deleteByUserAndProduct(User user, Product product);

    // Get all favorites for user (with products)
    @Query("SELECT f.product FROM UserFavorites f WHERE f.user = :user")
    List<Product> findFavoriteProductsByUser(@Param("user") User user);
}