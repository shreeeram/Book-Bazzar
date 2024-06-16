package com.app.controller;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.AuthResp;
import com.app.dto.UserDto;
import com.app.entities.User;
import com.app.jwt_utils.JwtUtils;
import com.app.security.CustomUserDetails;
import com.app.service.UserService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class SignInSignUpController {
//dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	// dep : user service for handling users
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper mapper;

	// add a method to authenticate user . In case of success --send back token ,
	// o.w  send back err mesg
	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request) {
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		//log.info("auth token " + authToken);
	//	try {
			// authenticate the credentials
			Authentication authentication = manager.authenticate(authToken);
			//log.info("auth token again " + authentication.getPrincipal().getClass());
			CustomUserDetails userDetails=(CustomUserDetails)authentication.getPrincipal();
			User user = userDetails.getUser();
			//System.out.println(user);
			//AuthResp resp = mapper.map(user,AuthResp.class);
			UserDto resp = mapper.map(user, UserDto.class);

			resp.setToken(utils.generateJwtToken(authentication));
			
			
			// => auth succcess
			return ResponseEntity.ok(resp);
	//		return ResponseEntity.ok(new AuthResp("Auth successful!", utils.generateJwtToken(authenticatedDetails)));
//		} catch (BadCredentialsException e) { // replaced  by a method in global exc handler
//			// send back err resp code
//			System.out.println("err " + e);
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
//		}
	}

	// add request handling method for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid User user) {
		System.out.println("in reg user : user " );
		if(userService.checkEmail(user.getEmail())) {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email Already Exist");
			
		}
		// invoke service layer method , for saving : user info + associated roles info
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUserDetails(user));
	}
}
