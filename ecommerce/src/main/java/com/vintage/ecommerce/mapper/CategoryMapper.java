package com.vintage.ecommerce.mapper;

import com.vintage.ecommerce.dto.CategoryDto;
import com.vintage.ecommerce.entity.Category;


public class CategoryMapper {

    public static CategoryDto mapToCategoryDto(Category category){
        return new CategoryDto(
                category.getId(),
                category.getName()
        );
    }

    public static Category mapToCategory(CategoryDto categoryDto){
        return new Category(
                categoryDto.getId(),
                categoryDto.getName()
        );
    }
}
