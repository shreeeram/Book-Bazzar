package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="review_id")
	private Integer id;
	
	private Integer custId;
	
	private String custName;
	
	private String content;
	
	private LocalDate date;
	
	private Integer bookId;
	
	private Integer rating;


}
