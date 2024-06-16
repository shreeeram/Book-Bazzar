package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;
import com.app.entities.Wishlist;

public interface WishListRepo extends JpaRepository<Wishlist, Integer> {
	
	public List<Wishlist>  findByUser(User u);

}
