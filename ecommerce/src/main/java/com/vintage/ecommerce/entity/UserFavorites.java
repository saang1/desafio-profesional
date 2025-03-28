package com.vintage.ecommerce.entity;


import com.vintage.ecommerce.entity.id.UserProductId;
import com.vintage.ecommerce.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_favorites")
public class UserFavorites {

    @EmbeddedId
    private UserProductId id = new UserProductId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;



    public UserFavorites(User user, Product product) {
        this.user = user;
        this.product = product;
        this.id = new UserProductId(user.getId(), product.getId());
    }
}
