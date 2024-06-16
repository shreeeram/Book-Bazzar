package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Book;
import com.app.entities.Cart;
import com.app.entities.User;


public interface CartRepo extends JpaRepository<Cart, Integer> {
	
	public List<Cart> findByBook(Book bk);
	
	public List<Cart> findByUser(User u);

}
