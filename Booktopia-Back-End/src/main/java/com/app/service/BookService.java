package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.BookDto;
import com.app.payloads.BookResponse;

public interface BookService {
	
	public BookDto addbook(BookDto bdto) ;

	BookDto getBookById(Integer id);
	
	public BookDto updateBook(BookDto bookDto);
	
	public void deleteBook(Integer id) ;
	
	public List<BookDto> searchBook(String ch);
	
	public BookResponse getAllBooks(int pageNo, int pageSize, String sortBy, String sortDir);
	
	public List<BookDto> getAllBooksList() ;
	
	public String getBookImg(Integer bookId);
	
	public Long getBookCount();
	
	public String makeAvailable(Integer id);
	
}
