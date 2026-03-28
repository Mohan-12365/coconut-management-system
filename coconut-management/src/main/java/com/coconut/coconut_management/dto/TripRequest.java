package com.coconut.coconut_management.dto;

import java.util.List;

public class TripRequest {

	private Long vehicleId;
	private String date;
	private List<LabourRequest> labours;
	
	public Long getVehicleId() {
		return vehicleId;
	}
	
	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}
	
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	
	public List<LabourRequest> getLabours() {
		return labours;
	}
	
	public void setLabours(List<LabourRequest> labours) {
		this.labours = labours;
	}
	
	//Inner class
	public static class LabourRequest {
		private Long labourId;
		private boolean isDriver;
		
		public Long getLabourId() {
			return labourId;
		}
		
		public void setLabourId(Long labourId) {
			this.labourId = labourId;
		}
		
		public boolean isDriver() {
			return isDriver;
		}
		
		public void setDriver(boolean isDriver) {
			this.isDriver = isDriver;
		}
	}
}
