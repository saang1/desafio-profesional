package com.vintage.ecommerce.service;

import com.vintage.ecommerce.dto.AttributeDto;

import java.util.List;

public interface AttributeService {

    List<AttributeDto> getAllAttributes();

    AttributeDto getAttributeById(Integer id);

    AttributeDto addAttribute(AttributeDto attributeDto);

    AttributeDto updateAttribute(Integer id, AttributeDto attributeDto);

    void deleteAttribute(Integer id);
}
