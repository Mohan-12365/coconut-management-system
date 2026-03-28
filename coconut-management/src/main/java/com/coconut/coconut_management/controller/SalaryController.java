package com.coconut.coconut_management.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.coconut.coconut_management.dto.WeeklySalaryResponse;
import com.coconut.coconut_management.repository.LabourDailyTransactionRepository;
import com.coconut.coconut_management.repository.TripLabourRepository;
import com.coconut.coconut_management.service.TripService;

@CrossOrigin("*")
@RestController
@RequestMapping("/salary")
public class SalaryController {

	@Autowired
    private TripLabourRepository tripLabourRepository;
	
	@Autowired
    private TripLabourRepository repo;

    @Autowired
    private LabourDailyTransactionRepository transactionRepository;
    
    @GetMapping("/monthly")
    public List<Object[]> getMonthlySalary(
    		@RequestParam int year,
    		@RequestParam int month) {
    	return repo.getMonthlySalary(year, month);
    }

    @GetMapping("/weekly/{labourId}")
    public Map<String, Object> getWeeklySalary(
            @PathVariable Long labourId,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        double totalWages = tripLabourRepository
                .findByLabourIdAndTrip_DateBetween(labourId, start, end)
                .stream()
                .mapToDouble(t -> t.getWage())
                .sum();

        double totalExpense = transactionRepository
                .findByLabourIdAndDateBetween(labourId, start, end)
                .stream()
                .mapToDouble(t -> t.getAmount())
                .sum();

        double finalSalary = totalWages - totalExpense;

        Map<String, Object> result = new HashMap<>();
        result.put("totalWages", totalWages);
        result.put("totalExpense", totalExpense);
        result.put("finalSalary", finalSalary);

        return result;
    }
}
