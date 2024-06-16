package com.app.entities;

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
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cart_id")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private Integer quantity;

	
	private Double totalPrice;

	@Override
	public String toString() {
		return "Cart [id=" + id + ", quantity=" + quantity + ", totalPrice="
				+ totalPrice + "]";
	}
	
	
	

}
