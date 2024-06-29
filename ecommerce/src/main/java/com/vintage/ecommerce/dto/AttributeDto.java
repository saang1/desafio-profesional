package com.vintage.ecommerce.dto;


import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttributeDto {
    private Integer id;
    private String name;
    private String icon;
}
