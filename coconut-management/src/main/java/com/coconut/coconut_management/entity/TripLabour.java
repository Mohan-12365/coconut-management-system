package com.coconut.coconut_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "trip_labour")
public class TripLabour {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//Many Trip Labour Belong to one Trip
	@ManyToOne
	@JoinColumn(name = "trip_id", nullable = false)
	@JsonIgnore
	private Trip trip;
	
	//Many tripLabours belong to one Labour
	@ManyToOne
	@JoinColumn(name = "labour_id", nullable = false)
	private Labour labour;
	
	@Column(name = "is_driver", nullable = false)
	private boolean isDriver;
	
	@Column(nullable = false)
	private double wage;
	
	public TripLabour() {}
	
	public Long getId() {
		return id;
	}
	
	public Trip getTrip() {
		return trip;
	}
	
	public void setTrip(Trip trip) {
		this.trip = trip;
	}
	
	public Labour getLabour() {
		return labour;
	}
	
	public void setLabour(Labour labour) {
		this.labour = labour;
	}
	
	public boolean isDriver() {
		return isDriver;
	}
	
	public void setDriver(boolean driver) {
		isDriver = driver;
	}
	
	public double getWage() {
		return wage;
	}
	
	public void setWage(Double wage) {
		this.wage = wage;
	}

}
