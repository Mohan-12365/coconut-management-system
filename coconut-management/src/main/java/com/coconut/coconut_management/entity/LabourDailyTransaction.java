package com.coconut.coconut_management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class LabourDailyTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	private Double amount;
	
	@Enumerated(EnumType.STRING)
	private TransactionType type;
	
	@ManyToOne
	@JoinColumn(name = "labour_id")
	private Labour labour;
	
	public LabourDailyTransaction() {}
	
	public Long getId() { return id; }
	
	public double getAmount() { return amount; }
	public void setAmount(Double amount) { this.amount = amount; }
	
	public LocalDate getDate() { return date; }
	public void setDate(LocalDate date) { this.date = date; }
	
	public TransactionType getType() { return type; }
	public void setType(TransactionType type) {this.type = type; }
	
	public Labour getLabour() { return labour; }
	public void setLabour(Labour labour) {this.labour = labour; }
	
}
