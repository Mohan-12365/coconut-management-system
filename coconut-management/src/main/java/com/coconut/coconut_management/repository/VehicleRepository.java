package com.coconut.coconut_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coconut.coconut_management.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}
