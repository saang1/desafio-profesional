package com.vintage.ecommerce.repository;

import com.vintage.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE " +
            "(:query IS NULL OR p.name LIKE %:query% OR p.description LIKE %:query%)")
    List<Product> searchProductsByNameOrDescription(@Param("query") String query);

    List<Product> findByNameContainingIgnoreCase(String query);

}
