package com.vintage.ecommerce.service.impl;

import com.vintage.ecommerce.dto.ReservationDto;
import com.vintage.ecommerce.entity.Product;
import com.vintage.ecommerce.entity.Reservation;
import com.vintage.ecommerce.exception.ReservationConflictException;
import com.vintage.ecommerce.repository.ProductRepository;
import com.vintage.ecommerce.repository.ReservationRepository;
import com.vintage.ecommerce.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ProductRepository productRepository;

    @Override
    public List<ReservationDto> getAvailableDates(Long productId) {
        List<Reservation> reservations = reservationRepository.findByProductId(productId);

        return reservations.stream()
                .map(reservation -> new ReservationDto(
                        reservation.getProduct().getId(),
                        reservation.getStartDate(),
                        reservation.getEndDate()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void reserveProduct(Long productId, LocalDate startDate, LocalDate endDate) {
        // Validate product existence
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found."));

        // Check for overlapping reservations
        List<Reservation> overlappingReservations =
                reservationRepository.findByProductIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        productId, endDate, startDate
                );

        if (!overlappingReservations.isEmpty()) {
            throw new IllegalArgumentException("The selected dates are already reserved.");
        }

        // Create and save a new reservation
        Reservation reservation = new Reservation(product, startDate, endDate);
        reservationRepository.save(reservation);
    }
}
