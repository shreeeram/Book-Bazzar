package com.app.dto;

import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Data
public class UserDto {
	private Integer id;

	private String name;

	private String email;

	private String password;

	private String mobNo;

	private String address;

	private String city;

	private String state;

	private String pincode;

	private String role ;
	
	private String token;
}
