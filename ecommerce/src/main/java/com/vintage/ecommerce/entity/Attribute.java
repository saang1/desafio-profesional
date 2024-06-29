package com.vintage.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="attribute")
public class Attribute {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String icon;
}
