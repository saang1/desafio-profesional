package com.vintage.ecommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Transient
    private String reservedDate;

    public String getReservedDate(){
        return startDate + " to " + endDate;
    }


    public Reservation(Product product, LocalDate startDate, LocalDate endDate) {
        this.product = product;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}
