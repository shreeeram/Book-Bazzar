package com.app.payloads;

import java.util.List;

import com.app.dto.BookDto;

public class BookResponse {

	private List<BookDto> book;

	private int pageNumber;

	private int pageSize;

	private long totalElements;

	private int totalPages;

	private boolean lastPage;

	public BookResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public List<BookDto> getBook() {
		return book;
	}

	public void setBook(List<BookDto> book) {
		this.book = book;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public boolean isLastPage() {
		return lastPage;
	}

	public void setLastPage(boolean lastPage) {
		this.lastPage = lastPage;
	}

}
