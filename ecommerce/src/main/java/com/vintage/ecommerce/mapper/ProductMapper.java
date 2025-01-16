package com.vintage.ecommerce.mapper;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.dto.ProductDto;
import com.vintage.ecommerce.entity.Attribute;
import com.vintage.ecommerce.entity.Product;

import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductDto mapToProductDto(Product product){
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getImages(),
                product.getAttributes().stream()
                        .map(attribute -> new AttributeDto(attribute.getId(), attribute.getName(), attribute.getIcon()))
                        .collect(Collectors.toList())
        );
    }

    public static Product mapToProduct(ProductDto productDto){
        return new Product(
                productDto.getId(),
                productDto.getName(),
                productDto.getDescription(),
                productDto.getCategory(),
                productDto.getPrice(),
                productDto.getImages(),
                productDto.getAttributes().stream()
                        .map(dto -> new Attribute(dto.getId(), dto.getName(), dto.getIcon()))
                        .collect(Collectors.toList())
        );
    }
}
