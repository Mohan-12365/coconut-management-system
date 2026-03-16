package com.coconut.coconut_management.entity;

import jakarta.persistence.*;
//import lombok.*;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Labour {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String phone;
	private Double totalAdvance = 0.0;
	
	public Labour() {}
	
	public Long getId() { return id;}
	
	public String getName() { return name;}
	public void setName(String name) {this.name = name; }
	
	public String getPhone() { return phone; }
	public void setPhone(String phone) {this.phone = phone; }
	
	public Double getTotalAdvance() { return totalAdvance; }
	public void setTotalAdvance(Double totalAdvance) { this.totalAdvance = totalAdvance; }
}
