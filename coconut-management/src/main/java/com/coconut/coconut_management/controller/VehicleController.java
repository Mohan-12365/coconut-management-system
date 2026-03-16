package com.coconut.coconut_management.controller;


import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.coconut.coconut_management.entity.Vehicle;
import com.coconut.coconut_management.repository.VehicleRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

	@Autowired
	private VehicleRepository vehicleRepository;
	
	//Add Vehicle
	@PostMapping("/add")
	public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
		return vehicleRepository.save(vehicle);	
	}
	
	//Get All Vehicles
	@GetMapping("/all")
	public List<Vehicle> getAllVehicles() {
		return vehicleRepository.findAll();
	}
	
	//Delete Vehicle
	@DeleteMapping("{id}")
	public String deleteVehicle(@PathVariable Long id) {
		vehicleRepository.deleteById(id);
		return "Vehicle Deleted Successfully";
	}
}
