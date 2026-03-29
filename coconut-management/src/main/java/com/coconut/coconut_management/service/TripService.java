package com.coconut.coconut_management.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coconut.coconut_management.dto.TripRequest;
import com.coconut.coconut_management.dto.WeeklySalaryResponse;
import com.coconut.coconut_management.entity.Labour;
import com.coconut.coconut_management.entity.LabourDailyTransaction;
import com.coconut.coconut_management.entity.Trip;
import com.coconut.coconut_management.entity.TripLabour;
import com.coconut.coconut_management.entity.Vehicle;
import com.coconut.coconut_management.repository.LabourDailyTransactionRepository;
import com.coconut.coconut_management.repository.LabourRepository;
import com.coconut.coconut_management.repository.TripLabourRepository;
import com.coconut.coconut_management.repository.TripRepository;
import com.coconut.coconut_management.repository.VehicleRepository;

@Service
public class TripService {

	private static final int DRIVER_EXTRA = 100;
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private LabourRepository labourRepository;
	
	@Autowired
	private TripRepository tripRepository;
	
	@Autowired
	private TripLabourRepository tripLabourRepository;
	
	@Autowired
	private LabourDailyTransactionRepository labourDailyTransactionRepository;
	
	// public String createFullTrip(TripRequest request) {
		
	// 	//Get Vehicle
	// 	Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
	// 			.orElseThrow(()  ->new RuntimeException("Vehicle not found"));
		
	// 	//Create Trip
	// 	Trip trip = new Trip();
	// 	trip.setVehicle(vehicle);
	// 	trip.setDate(LocalDate.parse(request.getDate()));
	// 	trip = tripRepository.save(trip);
		
	// 	//Calculate base wage
	// 	int totalAmount = vehicle.getFixedAmount();
	// 	int labourCount = request.getLabours().size();
	// 	int baseWage = totalAmount / labourCount;
		
	// 	//Save TripLabour for each labour
	// 	for (TripRequest.LabourRequest lr : request.getLabours()) {
			
	// 		Labour labour = labourRepository.findById(lr.getLabourId())
	// 				.orElseThrow(()  -> new RuntimeException("Labour not found"));
			
	// 		double finalWage = baseWage;
			
	// 		if (lr.isDriver()) {
	// 			finalWage += DRIVER_EXTRA;
	// 		}
			
	// 		TripLabour tripLabour = new TripLabour();
	// 		tripLabour.setTrip(trip);
	// 		tripLabour.setLabour(labour);
	// 		tripLabour.setDriver(lr.isDriver());
	// 		tripLabour.setWage(finalWage);
			
	// 		tripLabourRepository.save(tripLabour);
	// 	}
		
	// 	//return "Trip created successfully with wages calculated!";
	// 	List<Map<String, Object>> result = new ArrayList<>();
	// }

	public List<Map<String, Object>> createFullTrip(TripRequest request) {

    Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));

    Trip trip = new Trip();
    trip.setVehicle(vehicle);
    trip.setDate(LocalDate.parse(request.getDate()));
    trip = tripRepository.save(trip);

    int totalAmount = vehicle.getFixedAmount();
    int labourCount = request.getLabours().size();
    int baseWage = totalAmount / labourCount;

    List<Map<String, Object>> result = new ArrayList<>();

    for (TripRequest.LabourRequest lr : request.getLabours()) {

        Labour labour = labourRepository.findById(lr.getLabourId())
                .orElseThrow(() -> new RuntimeException("Labour not found"));

        double finalWage = baseWage;

        if (lr.isDriver()) {
            finalWage += DRIVER_EXTRA;
        }

        TripLabour tripLabour = new TripLabour();
        tripLabour.setTrip(trip);
        tripLabour.setLabour(labour);
        tripLabour.setDriver(lr.isDriver());
        tripLabour.setWage(finalWage);

        tripLabourRepository.save(tripLabour);

        Map<String, Object> data = new HashMap<>();
        data.put("name", labour.getName());
        data.put("phone", labour.getPhone());
        data.put("wage", finalWage);
        data.put("driver", lr.isDriver());

        result.add(data);
    }

    return result;
}

	
	public String calculateWeeklySalary(Long labourId, String startDate, String endDate) {
		
		LocalDate start = LocalDate.parse(startDate);
		LocalDate end = LocalDate.parse(endDate);
		
		//Get wages
		List<TripLabour> wages = tripLabourRepository
				.findByLabourAndDateRange(labourId, start, end);
		
		double totalWage = wages.stream()
				.mapToDouble(TripLabour::getWage)
				.sum();
		
		//Get expenses
		List<LabourDailyTransaction> expenses = labourDailyTransactionRepository
				.findByLabourAndDateRange(labourId, start, end);
		
		double totalExpense = expenses.stream()
				.mapToDouble(LabourDailyTransaction::getAmount)
				.sum();
		
		double finalAmount = totalWage - totalExpense;
		
		return "Total Wage: " + totalWage +
				", Total Expense: " + totalExpense +
				", Final Payable: " + finalAmount;
	}
	
	public WeeklySalaryResponse calculateWeeklySalary(Long labourId) {
		
		//Get all wages for that labour
		List<TripLabour> trips = tripLabourRepository.findByLabourId(labourId);
		
		double totalWage = trips.stream()
				.mapToDouble(TripLabour::getWage)
				.sum();
		
		//Get all Expenses for that labour
		List<LabourDailyTransaction> expenses = 
				labourDailyTransactionRepository.findByLabourId(labourId);
		
		double totalExpense = expenses.stream()
				.mapToDouble(LabourDailyTransaction::getAmount)
				.sum();
		
		//Final Salary
		double finalSalary = totalWage - totalExpense;
		
		return new WeeklySalaryResponse(totalWage, totalExpense, finalSalary);
	}
	
	public WeeklySalaryResponse calculateSalaryBetweenDates(
			Long labourId,
			String startDate,
			String endDate) {
		LocalDate start = LocalDate.parse(startDate);
		LocalDate end = LocalDate.parse(endDate);
		
		//Get wages between dates
		List<TripLabour> trips = 
				tripLabourRepository
				           .findByLabourIdAndTrip_DateBetween(labourId, start, end);
		
		double totalWage = trips.stream()
				.mapToDouble(TripLabour::getWage)
				.sum();
		
		//Get expenses between dates
		List<LabourDailyTransaction> expenses = 
				labourDailyTransactionRepository
				       .findByLabourIdAndDateBetween(labourId, start, end);
		
		double totalExpense = expenses.stream()
				.mapToDouble(LabourDailyTransaction::getAmount)
				.sum();
		
		double finalSalary = totalWage - totalExpense;
		
		return new WeeklySalaryResponse(totalWage, totalExpense, finalSalary);
	}
	}
