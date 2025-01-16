package com.vintage.ecommerce.service;

import com.vintage.ecommerce.dto.AttributeDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AttributeService {

    List<AttributeDto> getAllAttributes();

    AttributeDto getAttributeById(Integer id);

    AttributeDto addAttribute(AttributeDto attributeDto, MultipartFile image);

    AttributeDto updateAttribute(Integer id, AttributeDto attributeDto, MultipartFile image);

    void deleteAttribute(Integer id);
}
