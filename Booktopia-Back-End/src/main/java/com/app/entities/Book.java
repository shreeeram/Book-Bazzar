package com.app.entities;

import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="book_id")
	private Integer id;

	private String bookName;

	private String description;

	private String author;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	private String isbnNo;

	private String language;

	private Double price;

	private String img;
	
	private Integer status;
	

	@Override
	public String toString() {
		return "Book [id=" + id + ", bookName=" + bookName + ", description=" + description + ", author=" + author
				+ ", isbnNo=" + isbnNo + ", language=" + language + ", price=" + price + ", img=" + img + "]";
	}

}
