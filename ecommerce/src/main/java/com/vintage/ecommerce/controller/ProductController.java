package com.vintage.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.exception.ResourceNotFoundException;
import com.vintage.ecommerce.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;



    // Create product

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(
            @RequestParam("product") String productJson,
            @RequestParam("images") MultipartFile[] images) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDto productDto = objectMapper.readValue(productJson, ProductDto.class);
        ProductDto createdProduct = productService.createProduct(productDto, images);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }


    // Get product by id

    @GetMapping("{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long productId) {
        ProductDto productDto = productService.getProductById(productId);
        return ResponseEntity.ok(productDto);
    }


    // Get all products

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(products);
    }


    // Delete product

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully!");
    }



    //  Update Product
    @PutMapping("{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Long productId,
                                                    @RequestBody ProductDto updatedProduct,
                                                    @RequestBody MultipartFile[] images) throws IOException {
        ProductDto productDto = productService.updateProduct(productId, updatedProduct, images );
        return ResponseEntity.ok(productDto);
        }

}
