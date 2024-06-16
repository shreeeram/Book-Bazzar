package com.app.entities;

import java.time.LocalDate;

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
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="order_id")
	private Integer id;

	@ManyToOne
	private User user;

	@ManyToOne
	private Book book;
	
	@OneToOne(mappedBy = "order")
	private Payment paymentId;

	private int quantity;

	private String paymentType;

	private String orderNumber;

	private LocalDate date;

	private Double price ;
	
	private String status;

	@Override
	public String toString() {
		return "Orders [id=" + id + ", quantity=" + quantity + ", paymentType=" + paymentType + ", orderNumber="
				+ orderNumber + ", date=" + date + ", status=" + status + "]";
	}
	
	

}
