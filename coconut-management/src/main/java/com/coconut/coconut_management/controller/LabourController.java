package com.coconut.coconut_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.coconut.coconut_management.entity.Labour;
import com.coconut.coconut_management.repository.LabourRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/labours")
public class LabourController {

	@Autowired
	private LabourRepository labourRepository;
	
	//Add new labour
	@PostMapping("/add")
	public Labour addLabour(@RequestBody Labour labour) {
		return labourRepository.save(labour);
	}
	
	//Get all labours
	@GetMapping("/all")
	public List<Labour> getAllLabours() {
		return labourRepository.findAll();
	}
	
	 @GetMapping("/{id}")
	    public Labour getLabourById(@PathVariable Long id) {
	        return labourRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Labour not found"));
	 }
	
	@PutMapping("/update/{id}")
	public Labour updateLabour(@PathVariable Long id, @RequestBody Labour labourDetails) {

	    Labour labour = labourRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Labour not found"));

	    labour.setName(labourDetails.getName());
	    labour.setPhone(labourDetails.getPhone());
	    labour.setTotalAdvance(labourDetails.getTotalAdvance());

	    return labourRepository.save(labour);
	}
}
