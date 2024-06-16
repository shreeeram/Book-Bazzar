package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CategoryDto;
import com.app.service.CategoryService;

@RestController
@CrossOrigin(exposedHeaders = "*" , origins = "*"  )
@RequestMapping("/api/category")
public class CategoryController {
	@Autowired
	private CategoryService catService;
	
	@PostMapping
	public ResponseEntity<?> addCategory(@RequestBody CategoryDto catDto){
		
	return ResponseEntity.status(HttpStatus.CREATED).body(catService.addCategory(catDto));	
	}
	
	
	@GetMapping("/categories")
	public ResponseEntity<?> getCategories() {
		return new ResponseEntity<>(catService.getAllCategory(), HttpStatus.OK);
	}
	
	@PutMapping("/category/{id}")
	public ResponseEntity<?> updateCategory(@PathVariable Integer id , @RequestBody CategoryDto cat) {
		return new ResponseEntity<>(catService.updateCategory(cat, id), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
		catService.deleteCategory(id);
		return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
	}
	
	
	

	
	

}
