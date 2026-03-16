package com.coconut.coconut_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "trip")
public class Trip {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
	private List<TripLabour> tripLabours;
	
	
	
	//Many Trips Belong to One Vehicle
	@ManyToOne
	@JoinColumn(name = "vehicle_id", nullable = false)
	private Vehicle vehicle;
	
	@Column(nullable = false)
	private LocalDate date;
	
	public Trip() {
	}
	
	public Trip(Vehicle vehicle, LocalDate date) {
		this.vehicle = vehicle;
		this.date = date;
	}
	
	public Long getId() {
		return id;
	}
	
	public Vehicle getVehicle() {
		return vehicle;
	}
	
	public List<TripLabour> getTripLabours() {
		return tripLabours;
	}
	
	public void setTripLabours(List<TripLabour> tripLabours) {
		this.tripLabours = tripLabours;
	}
	
	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}
	
	public LocalDate getDate() {
		return date;
	}
	
	public void setDate(LocalDate date) {
		this.date = date;
	}

}
