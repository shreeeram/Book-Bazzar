package com.app.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ReviewDto {

	private Integer id;

	private Integer custId;

	private String custName;

	private String content;

	private LocalDate date;

	private Integer bookId;

	private Integer rating;
}
