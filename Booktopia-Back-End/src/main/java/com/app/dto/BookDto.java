package com.app.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.app.entities.Category;

public class BookDto {

	private Integer id;

//	private String demo;

	@NotEmpty
	private String bookName;

	@NotEmpty
	private String description;

	@NotEmpty
	private String author;


	private String category;
	
	private CategoryDto cat;
	
	




	@NotEmpty
	private String isbnNo;

	@NotEmpty
	private String language;

	@NotNull
	private Double price;

	private String img;
	
	private Double avgRating;
	
	private Integer status;
	
	private Integer count;

	public CategoryDto getCat() {
		return cat;
	}

	public void setCat(CategoryDto cat) {
		this.cat = cat;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Double getAvgRating() {
		return avgRating;
	}

	public void setAvgRating(Double avgRating) {
		this.avgRating = avgRating;
	}

	public BookDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getIsbnNo() {
		return isbnNo;
	}

	public void setIsbnNo(String isbnNo) {
		this.isbnNo = isbnNo;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}


	@Override
	public String toString() {
		return "BookDto [id=" + id + ", bookNames=" + bookName + ", description=" + description + ", author=" + author
				+ ", category=" + category + ", isbnNo=" + isbnNo + ", language="
				+ language + ", price=" + price + ", img=" + img + "]";
	}

}
