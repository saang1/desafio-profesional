package com.vintage.ecommerce.service;

import com.vintage.ecommerce.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto getCategoryById(Long categoryId);

    List<CategoryDto> getAllCategories();

    void deleteCategory(Long categoryId);

}
