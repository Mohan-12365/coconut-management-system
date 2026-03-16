package com.coconut.coconut_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import com.coconut.coconut_management.entity.LabourDailyTransaction;


public interface LabourDailyTransactionRepository extends JpaRepository<LabourDailyTransaction,Long> {

	List<LabourDailyTransaction> findByLabourId(Long labourId);
	
	@Query("Select t FROM LabourDailyTransaction t WHERE t.labour.id = :labourId AND t.date BETWEEN :start AND :end")
	List<LabourDailyTransaction> findByLabourAndDateRange(@Param("labourId") Long labourId,
			                                 @Param("start") LocalDate start,
			                                 @Param("end") LocalDate end);
	
	List<LabourDailyTransaction> findByLabourIdAndDateBetween(
			Long labourId,
			LocalDate start,
			LocalDate end);
	
	List<LabourDailyTransaction> findByDateBetween(LocalDate start, LocalDate end);
}
