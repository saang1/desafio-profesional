package com.vintage.ecommerce.service;

import com.vintage.ecommerce.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto, MultipartFile[] images) throws IOException;

    ProductDto getProductById(Long productId);

    List<ProductDto> getAllProducts();

    void deleteProduct(Long productId);

}
