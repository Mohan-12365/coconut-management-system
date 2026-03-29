package com.coconut.coconut_management.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.coconut.coconut_management.entity.TripLabour;
import com.coconut.coconut_management.dto.TripLabourDTO;


public interface TripLabourRepository extends JpaRepository<TripLabour, Long> {

	@Query("Select tl FROM TripLabour tl WHERE tl.labour.id = :labourId AND tl.trip.date BETWEEN :start AND :end")
	List<TripLabour> findByLabourAndDateRange(@Param("labourId") Long labourId,
			                                 @Param("start") LocalDate start,
			                                 @Param("end") LocalDate end);
	
	List<TripLabour> findByLabourId(Long labourId);
	
	List<TripLabour> findByLabourIdAndTrip_DateBetween(
			Long labourId,
			LocalDate start,
			LocalDate end);
	
	List<TripLabour> findByTrip_DateBetween(LocalDate start, LocalDate end);
	
	
	
	@Query("""
			SELECT tl.labour.id, tl.labour.name, COUNT(tl), SUM(tl.wage)
			FROM TripLabour tl
			WHERE YEAR(tl.trip.date) = :year 
			AND MONTH(tl.trip.date) = :month
			GROUP BY tl.labour.id, tl.labour.name
			""")
			List<Object[]> getMonthlySalary(@Param("year") int year,
			                                 @Param("month") int month);

	@Query("SELECT new com.coconut.coconut_management.dto.TripLabourDTO(" +
       "l.name, l.mobile, tl.wage, tl.driver) " +
       "FROM TripLabour tl " +
       "JOIN tl.labour l " +
       "JOIN tl.trip t " +
       "WHERE t.date = :date")
List<TripLabourDTO> findTripsByDate(@Param("date") LocalDate date);
	
}
