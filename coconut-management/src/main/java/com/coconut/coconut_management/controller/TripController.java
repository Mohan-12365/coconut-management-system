package com.coconut.coconut_management.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.coconut.coconut_management.entity.Trip;
import com.coconut.coconut_management.entity.Vehicle;
import com.coconut.coconut_management.repository.TripRepository;
import com.coconut.coconut_management.repository.VehicleRepository;
import com.coconut.coconut_management.dto.TripRequest;
import com.coconut.coconut_management.service.TripService;

@CrossOrigin("*")
@RestController
@RequestMapping("/trips")
public class TripController {

	@Autowired
	private TripRepository tripRepository;
	
	@Autowired
	private VehicleRepository vehicleRepository;
	
	@Autowired
	private TripService tripService;
	
	//Create Trip
	@PostMapping
	public Trip createTrip(@RequestParam Long vehicleId,
			               @RequestParam String date) {
		
		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(()  ->new  RuntimeException("Vehicle Not Found"));
		
		Trip trip = new Trip();
		trip.setVehicle(vehicle);
		trip.setDate(LocalDate.parse(date)); 
		
		return tripRepository.save(trip);
	}
	
	@PostMapping("/full")
	public List<Map<String, Object>> createFullTrip(@RequestBody TripRequest request) {
		return tripService.createFullTrip(request);
	}
	
	//Get All Trips
	@GetMapping("/all")
	public List<Trip> getAllTrips() {
		return tripRepository.findAll();
	}
	
	
	
	@GetMapping("/weekly-salary")
	public String getWeeklySalary(@RequestParam Long labourId,
			                      @RequestParam String start,
			                      @RequestParam String end) {
		return tripService.calculateWeeklySalary(labourId, start, end);
	}
}
