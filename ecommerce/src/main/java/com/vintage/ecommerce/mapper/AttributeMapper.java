package com.vintage.ecommerce.mapper;

import com.vintage.ecommerce.dto.AttributeDto;
import com.vintage.ecommerce.entity.Attribute;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
public class AttributeMapper {

    public AttributeDto toDTO(Attribute attribute) {
        return new AttributeDto(
                attribute.getId(),
                attribute.getName(),
                attribute.getIcon()
        );
    }

    public Attribute toEntity(AttributeDto attributeDto) throws IOException {
        return new Attribute(
                attributeDto.getId(),
                attributeDto.getName(),
                attributeDto.getIcon()
        );

    }
}
