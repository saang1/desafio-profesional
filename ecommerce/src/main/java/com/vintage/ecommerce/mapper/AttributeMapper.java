package com.vintage.ecommerce.mapper;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.entity.Attribute;
import org.springframework.stereotype.Component;


@Component
public class AttributeMapper {

    public AttributeDto toDTO(Attribute attribute) {
        return AttributeDto.builder()
                .id(attribute.getId())
                .name(attribute.getName())
                .icon(attribute.getIcon())
                .build();
    }

    public Attribute toEntity(AttributeDto attributeDto) {
        return Attribute.builder()
                .id(attributeDto.getId())
                .name(attributeDto.getName())
                .icon(attributeDto.getIcon())
                .build();
    }
}
