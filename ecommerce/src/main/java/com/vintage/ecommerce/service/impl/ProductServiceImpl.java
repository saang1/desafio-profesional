package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.exception.ResourceNotFoundException;
import com.vintage.ecommerce.mapper.ProductMapper;
import com.vintage.ecommerce.repository.ProductRepository;
import com.vintage.ecommerce.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {


    private ProductRepository productRepository;


    @Override
    public ProductDto createProduct(ProductDto productDto, MultipartFile image) throws IOException {
        Product product = ProductMapper.mapToProduct(productDto);
        product.setImage(image.getBytes()); // Set image data
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product does not exists with given id: " + productId));
        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map((product) -> ProductMapper.mapToProductDto(product))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(Long productId) {

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product does not exists with given id: " + productId)
        );

        productRepository.deleteById(productId);

    }


}

