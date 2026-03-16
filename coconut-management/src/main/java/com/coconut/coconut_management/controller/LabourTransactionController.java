package com.coconut.coconut_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.coconut.coconut_management.entity.*;
import com.coconut.coconut_management.repository.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/transactions")
public class LabourTransactionController {

	@Autowired
	private LabourDailyTransactionRepository transactionRepository;
	
	@Autowired
	private LabourRepository labourRepository;
	
	//Add Transaction
	@PostMapping("/add")
	public LabourDailyTransaction addTransaction(
			@RequestParam Long labourId,
			@RequestBody LabourDailyTransaction transaction) {
		
		Labour labour = labourRepository.findById(labourId)
				.orElseThrow(()  ->new RuntimeException("Labour not found"));
		
		transaction.setLabour(labour);
		
		return transactionRepository.save(transaction);
	}
	
	//Get transactions by labour
	@GetMapping("/labour/{labourId}")
	public List<LabourDailyTransaction> getByLabour(@PathVariable Long labourId) {
		return transactionRepository.findByLabourId(labourId);
	}
	
}
