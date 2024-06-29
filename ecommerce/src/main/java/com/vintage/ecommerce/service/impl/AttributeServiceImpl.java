package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.entity.Attribute;
import com.vintage.ecommerce.mapper.AttributeMapper;
import com.vintage.ecommerce.repository.AttributeRepository;
import com.vintage.ecommerce.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttributeServiceImpl implements AttributeService {

    private final AttributeRepository attributeRepository;
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
    public AttributeDto addAttribute(AttributeDto attributeDto) {
        Attribute attribute = attributeMapper.toEntity(attributeDto);
        return attributeMapper.toDTO(attributeRepository.save(attribute));
    }

    @Override
    public AttributeDto updateAttribute(Integer id, AttributeDto attributeDto) {
        Attribute attribute = attributeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attribute not found"));

        attribute.setName(attributeDto.getName());
        attribute.setIcon(attributeDto.getIcon());

        return attributeMapper.toDTO(attributeRepository.save(attribute));
    }

    @Override
    public void deleteAttribute(Integer id) {
        attributeRepository.deleteById(id);
    }
}
