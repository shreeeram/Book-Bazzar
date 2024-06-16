package com.app.entities;

import java.util.ArrayList;
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
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="category_id")
	private Integer id;

	private String categoryName;

	private String description;

	
	@OneToMany(mappedBy = "category",  cascade = CascadeType.ALL,fetch =FetchType.LAZY )
	private List<Book> book = new ArrayList<Book>();


	@Override
	public String toString() {
		return "Category [id=" + id + ", categoryName=" + categoryName + ", description=" + description + "]";
	}
	
	
	

}
