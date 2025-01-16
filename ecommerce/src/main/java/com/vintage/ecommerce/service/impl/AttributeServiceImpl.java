package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.entity.Attribute;
import com.vintage.ecommerce.mapper.AttributeMapper;
import com.vintage.ecommerce.repository.AttributeRepository;
import com.vintage.ecommerce.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttributeServiceImpl implements AttributeService {

    @Autowired
    private final AttributeRepository attributeRepository;
    @Autowired
    private final AttributeMapper attributeMapper;

    @Override
    public List<AttributeDto> getAllAttributes() {
        return attributeRepository.findAll().stream()
                .map(attributeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AttributeDto getAttributeById(Integer id) {
        return attributeRepository.findById(id)
                .map(attributeMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Attribute not found"));
    }

    @Override
    public AttributeDto addAttribute(AttributeDto attributeDto, MultipartFile icon) {
        Attribute attribute = new Attribute();
        attribute.setName(attributeDto.getName());
        if (icon != null && !icon.isEmpty()) {
            try {
                attribute.setIcon(icon.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to store icon", e);
            }
        }
        Attribute savedAttribute = attributeRepository.save(attribute);
        return attributeMapper.toDTO(savedAttribute);
    }

    public AttributeDto updateAttribute(Integer id, AttributeDto attributeDto, MultipartFile image) {
        Optional<Attribute> attributeOpt = attributeRepository.findById(id);
        if (attributeOpt.isPresent()) {
            Attribute attribute = attributeOpt.get();
            attribute.setName(attributeDto.getName());
            if (image != null && !image.isEmpty()) {
                try {
                    attribute.setIcon(image.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store image", e);
                }
            }
            Attribute updatedAttribute = attributeRepository.save(attribute);
            return attributeMapper.toDTO(updatedAttribute);
        } else {
            throw new RuntimeException("Attribute not found");
        }
    }


    @Override
    public void deleteAttribute(Integer id) {
        attributeRepository.deleteById(id);
    }
}
