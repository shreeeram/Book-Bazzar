package com.app.service;

import java.util.List;

import com.app.dto.BookDto;
import com.app.dto.CategoryDto;
import com.app.entities.Book;
import com.app.entities.Category;

public interface CategoryService {
	
	public CategoryDto addCategory(CategoryDto catDto);
	
	public Category getCategory(String catName);
	
	public  List<BookDto>  getBookByCategory(Integer id);
	
	void deleteCategory(Integer id);
	
	CategoryDto updateCategory(CategoryDto categoryDto, Integer id);

	List<CategoryDto> getAllCategory();
};
