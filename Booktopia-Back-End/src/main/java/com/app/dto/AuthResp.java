package com.app.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthResp {
	private Long id;

	private String email;

 //	private String password;

	private String name;

	

	private String role;

	private String token;
}
