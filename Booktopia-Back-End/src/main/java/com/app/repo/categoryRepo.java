package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Category;

public interface categoryRepo extends JpaRepository<Category, Integer>{

	public Category findByCategoryName(String catName);
}
