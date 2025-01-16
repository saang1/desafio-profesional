package com.vintage.ecommerce.repository;

import com.vintage.ecommerce.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByProductId(Long productId);

    List<Reservation> findByProductIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long productId, LocalDate startDate, LocalDate endDate
    );
}
