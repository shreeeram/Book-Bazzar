package com.app.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Book;

public interface BookRepo extends JpaRepository<Book, Integer>{
	
	@Query("SELECT m FROM Book m WHERE m.bookName LIKE %:ch% or m.author LIKE %:ch% or m.isbnNo LIKE %:ch% ")
	public List<Book> search(String ch);
	



}
