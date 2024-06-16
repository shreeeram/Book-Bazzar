package com.app.service;

import java.util.List;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.CartDto;
import com.app.dto.UserDto;
import com.app.entities.User;
//import com.app.exceptions.UserAlreadyExistsException;
import com.app.repo.UserRepo;
import com.app.security.CustomUserDetails;
@Service
@org.springframework.transaction.annotation.Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder enc;

	@Override
	public boolean checkEmail(String email) {
		return userRepo.existsByEmail(email);
	}
	
	

	@Override
	public User addUserDetails(User user) {
//		if (userRepo.existsByEmail(user.getEmail()))
//			throw new Exception("User Email already exists!!);
		// encrypt the pwd
		user.setPassword(enc.encode(user.getPassword()));
		user.setRole("ROLE_CUSTOMER");
		return userRepo.save(user);
	}

	@Override
	public UserDto createUser(UserDto userDto) {
		
		return mapper.map(userRepo.save(mapper.map(userDto, User.class)),UserDto.class);
	}

	@Override
	public UserDto getUserById(Integer id) {
		
		return mapper.map(userRepo.findById(id) ,UserDto.class);
	}
	
	@Override
	public UserDto getUserByEmailAndPassword(UserDto udto) {
		
		return mapper.map(userRepo.findByEmailAndPassword(udto.getEmail(),udto.getPassword()) ,UserDto.class);
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID"));
		// use email valid
		return new CustomUserDetails(user);
	}

	@Override
	public UserDto updateUser(User u) {
		// TODO Auto-generated method stub
		UserDto uu=mapper.map(userRepo.save(u), UserDto.class);
		return uu ;
	}

	@Override
	public UserDto signInWithUserReturnJwt(UserDto userDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserDto> getAllUser() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Long getUserCount() {
		return userRepo.count();
	}
	
	

}
