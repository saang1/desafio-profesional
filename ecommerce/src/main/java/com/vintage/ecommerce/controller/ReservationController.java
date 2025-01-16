package com.vintage.ecommerce.controller;

import com.vintage.ecommerce.dto.ReservationDto;
import com.vintage.ecommerce.exception.ReservationConflictException;
import com.vintage.ecommerce.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/available/{productId}")
    public List<ReservationDto> getAvailableDates(@PathVariable Long productId) {
        return reservationService.getAvailableDates(productId);
    }

    @PostMapping
    public ResponseEntity<String> createReservation(@RequestBody ReservationDto reservationDto) {
        try {
            reservationService.reserveProduct(
                    reservationDto.getProductId(),
                    reservationDto.getStartDate(),
                    reservationDto.getEndDate()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body("Reservation created successfully.");
        } catch (ReservationConflictException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
