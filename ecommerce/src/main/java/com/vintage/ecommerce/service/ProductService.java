package com.vintage.ecommerce.service;

import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.dto.ReservationDto;
import com.vintage.ecommerce.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto, MultipartFile[] images) throws IOException;

    ProductDto getProductById(Long productId);

    Product getProductEntityById(Long productId);


    List<ProductDto> getAllProducts();

    void deleteProduct(Long productId);

    ProductDto updateProduct(Long productId, ProductDto updatedProducts, MultipartFile[] images) throws IOException ;

    List<ProductDto> searchProducts(String query);

    List<ProductDto> getSuggestions(String query);

}
