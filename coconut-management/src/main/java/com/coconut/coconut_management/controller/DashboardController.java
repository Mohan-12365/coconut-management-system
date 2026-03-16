package com.coconut.coconut_management.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import com.coconut.coconut_management.repository.LabourDailyTransactionRepository;
import com.coconut.coconut_management.repository.LabourRepository;
import com.coconut.coconut_management.repository.TripLabourRepository;
import com.coconut.coconut_management.repository.VehicleRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private LabourRepository labourRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private TripLabourRepository tripLabourRepository;

    @Autowired
    private LabourDailyTransactionRepository transactionRepository;

    @GetMapping
    public Map<String, Object> getDashboard() {

        LocalDate now = LocalDate.now();
        LocalDate startOfWeek = now.minusDays(7);

        long totalLabours = labourRepository.count();
        long totalVehicles = vehicleRepository.count();

        double totalWages = tripLabourRepository
                .findByTrip_DateBetween(startOfWeek, now)
                .stream()
                .mapToDouble(t -> t.getWage())
                .sum();

        double totalExpense = transactionRepository
                .findByDateBetween(startOfWeek, now)
                .stream()
                .mapToDouble(t -> t.getAmount())
                .sum();

        Map<String, Object> result = new HashMap<>();
        result.put("totalLabours", totalLabours);
        result.put("totalVehicles", totalVehicles);
        result.put("totalWages", totalWages);
        result.put("totalExpense", totalExpense);
        result.put("netAmount", totalWages - totalExpense);

        return result;
    }
}