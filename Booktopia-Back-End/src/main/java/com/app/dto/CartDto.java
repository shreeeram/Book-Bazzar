package com.app.dto;

import com.app.entities.Book;
import com.app.entities.User;

import lombok.Data;

@Data
public class CartDto {
	
	private Integer id;
    private String img;
	private BookDto book;
//
//	private User user;
	private Integer bookId;
	
	private Integer userId;

	private Integer quantity;
	
	private Double totalPrice;
}
