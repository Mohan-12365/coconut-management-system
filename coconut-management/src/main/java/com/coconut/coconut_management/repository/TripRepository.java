package com.coconut.coconut_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coconut.coconut_management.entity.Trip;

public interface TripRepository extends JpaRepository<Trip, Long>{

}
