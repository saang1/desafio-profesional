package com.vintage.ecommerce.service;

import com.vintage.ecommerce.dto.ReservationDto;
import java.time.LocalDate;
import java.util.List;

public interface ReservationService {

    List<ReservationDto> getAvailableDates(Long productId);

    void reserveProduct(Long productId, LocalDate startDate, LocalDate endDate);

}
