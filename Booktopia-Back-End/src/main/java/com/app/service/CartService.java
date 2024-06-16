package com.app.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.app.dto.BookDto;
import com.app.dto.CartDto;
import com.app.dto.UserDto;

public interface CartService {

	public CartDto addCart(CartDto cartDto);

	public List<CartDto> getCartByUser(Integer id);

	public List<CartDto> getAllCartByUser(HttpServletRequest request);

	public CartDto updateQuantity(Integer id, Integer quntity);

	public void deleteCart(Integer id);
	
	public boolean CheckCartByUser(Integer id);
	
	public boolean CheckCartByUserAndBook(Integer userId,Integer bookId) ;

}
