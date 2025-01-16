package com.vintage.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {

    private Long productId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reservedDate;

    public ReservationDto(Long productId, LocalDate startDate, LocalDate endDate) {
        this.productId = productId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reservedDate = startDate + " to " + endDate;
    }
}
