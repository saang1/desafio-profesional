package com.vintage.ecommerce.dto;


import lombok.*;


@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttributeDto {
    private Integer id;
    private String name;
    private byte[] icon;



}
