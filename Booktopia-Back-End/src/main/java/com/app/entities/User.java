package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

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
@Table(name = "users")
public class User {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private Integer id;
	

	private String name;

	private String email;

	private String password;

	private String mobNo;

	private String address;

	private String city;

	private String state;

	private String pincode;
	
	private String role;
	
	@Transient
	private String token;
	
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , fetch =FetchType.LAZY)
	List<Orders> orderList=new ArrayList<Orders>();
	
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , fetch =FetchType.LAZY)
	List<Cart> cartList=new ArrayList<Cart>();
	
	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , fetch =FetchType.LAZY)
	List<Wishlist> wishList=new ArrayList<Wishlist>();

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", mobNo=" + mobNo
				+ ", address=" + address + ", city=" + city + ", state=" + state + ", pincode=" + pincode + ", role="
				+ role + ", token=" + token + "]";
	}
	
	


}
