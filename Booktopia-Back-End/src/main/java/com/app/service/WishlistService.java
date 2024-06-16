package com.app.service;

import java.util.List;

import com.app.dto.WishlistDto;
import com.app.entities.Wishlist;

public interface WishlistService {
	
	public WishlistDto addToWishList(WishlistDto wishlistDto); 
	
	public boolean CheckWishlistByUserAndBook(Integer userId,Integer bookId) ;
	
	public List<WishlistDto> getAllWishList(Integer userId);
	
	public String  removeWishlist(Integer wishId );

}
