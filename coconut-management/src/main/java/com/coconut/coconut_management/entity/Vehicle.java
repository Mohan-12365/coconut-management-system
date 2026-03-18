package com.coconut.coconut_management.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "vehicle")
public class Vehicle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "vehicle_no", nullable = false, unique = true)
	private String vehicleNo;
	
	@Column(name = "fixed_amount", nullable = false)
	private Integer fixedAmount;
	
	// Default Constructor (Important for JPA)
	public Vehicle() {
	}
	
	//Constructor
	public Vehicle(String vehicleNo, Integer fixedAmount) {
		this.vehicleNo = vehicleNo;
		this.fixedAmount = fixedAmount;
		
	}
	
	//Getters and Setters
	
	public Long getId() {
		return id;
	}
	
	public String getVehicleNo() {
		return vehicleNo;
	}
	
	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}
	
	public Integer getFixedAmount() {
		return fixedAmount;
	}
	
	public void setFixedAmount(Integer fixedAmount) {
		this.fixedAmount = fixedAmount;
	}
}
