package com.coconut.coconut_management.dto;

public class WeeklySalaryResponse {

	private double totalWage;
	private double totalExpense;
	private double finalSalary;
	
	public WeeklySalaryResponse(double totalWage, double totalExpense, double finalSalary) {
		this.totalWage = totalWage;
		this.totalExpense = totalExpense;
		this.finalSalary = finalSalary;
	}
	
	public double getTotalWage() {
		return totalWage;
	}
	
	public double getTotalExpense() {
		return totalExpense;
	}
	
	public double getFinalSalary() {
		return finalSalary;
	}
}
