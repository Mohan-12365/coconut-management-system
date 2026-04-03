package com.coconut.coconut_management.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.coconut.coconut_management.entity.Labour;

public interface LabourRepository extends JpaRepository<Labour, Long> {

  Optional<Labour> findByUsername(String username);
}
