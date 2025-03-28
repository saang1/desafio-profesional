package com.vintage.ecommerce.entity.id;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@Getter
@Setter
public class UserProductId implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "products_id")
    private Long productId;

    public UserProductId() {

    }
}
