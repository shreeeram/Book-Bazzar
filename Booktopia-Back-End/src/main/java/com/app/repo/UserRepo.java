package com.app.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.UserDto;
import com.app.entities.User;

public interface UserRepo extends JpaRepository<User, Integer> {

	public User findByEmailAndPassword(String mail, String pass);

	public Optional<User> findByEmail(String mail);

	boolean existsByEmail(String email);

}
