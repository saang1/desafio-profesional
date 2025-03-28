package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.exception.ResourceNotFoundException;
import com.vintage.ecommerce.mapper.ProductMapper;
import com.vintage.ecommerce.repository.ProductRepository;
import com.vintage.ecommerce.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
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
        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public Product getProductEntityById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
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




    @Override
    public ProductDto updateProduct(Long productId, ProductDto updatedProduct, MultipartFile[] images) throws IOException {

        Product product = productRepository.findById(productId).orElseThrow(
                () ->new ResourceNotFoundException("Product does not exists with given id:" + productId)
        );

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setCategory(updatedProduct.getCategory());
        product.setPrice(updatedProduct.getPrice());

        if (images != null && images.length > 0) {
            product.setImages(List.of(images).stream()
                    .map(image -> {
                        try {
                            return image.getBytes();
                        } catch (IOException e) {
                            throw new RuntimeException("Error processing image", e);
                        }
                    }).collect(Collectors.toList()));
        }

        Product updateProductObj = productRepository.save(product);

        return ProductMapper.mapToProductDto(updateProductObj);
    }


    @Override
    public List<ProductDto> searchProducts(String query) {
        List<Product> products = productRepository.searchProductsByNameOrDescription(query);

        return products.stream()
                .map(ProductMapper::mapToProductDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getSuggestions(String query) {
        return productRepository.findByNameContainingIgnoreCase(query)
                .stream()
                .map(product -> new ProductDto(product.getId(), product.getName())) // Return id and name
                .collect(Collectors.toList());
    }




}
