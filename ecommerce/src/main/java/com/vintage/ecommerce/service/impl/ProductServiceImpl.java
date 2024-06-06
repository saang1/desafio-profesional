package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Category;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.exception.ResourceNotFoundException;
import com.vintage.ecommerce.mapper.ProductMapper;
import com.vintage.ecommerce.repository.CategoryRepository;
import com.vintage.ecommerce.repository.ProductRepository;
import com.vintage.ecommerce.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.vintage.ecommerce.mapper.ProductMapper.mapToProductDto;


@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {



    private final ProductRepository productRepository;



    @Override
    public ProductDto createProduct(ProductDto productDto, MultipartFile[] images) throws IOException {
        Product product = ProductMapper.mapToProduct(productDto);
        if (images != null && images.length > 0) {
            List<byte[]> imageBytesList = new ArrayList<>();
            for (MultipartFile image : images) {
                imageBytesList.add(image.getBytes());
            }
            product.setImages(imageBytesList);
        }
        Product savedProduct = productRepository.save(product);
        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product does not exists with given id: " + productId));
        return mapToProductDto(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map((product) -> mapToProductDto(product))
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
