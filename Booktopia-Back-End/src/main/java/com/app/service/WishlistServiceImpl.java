package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BookDto;
import com.app.dto.CartDto;
import com.app.dto.WishlistDto;
import com.app.entities.Book;
import com.app.entities.Cart;
import com.app.entities.User;
import com.app.entities.Wishlist;
import com.app.repo.BookRepo;
import com.app.repo.UserRepo;
import com.app.repo.WishListRepo;

@Service
@Transactional
public class WishlistServiceImpl implements WishlistService {

	@Autowired
	private WishListRepo wishlistRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private BookRepo bookRepo;
	
	@Autowired
	private CartService cartService;

	@Autowired
	private ModelMapper mapper;

	@Override
	public WishlistDto addToWishList(WishlistDto wishlistDto) {
		Book book = bookRepo.findById(wishlistDto.getBookId()).get();
		User user = userRepo.findById(wishlistDto.getUserId()).get();
		Wishlist wishList = mapper.map(wishlistDto, Wishlist.class);
		wishList.setUser(user);
		wishList.setBook(book);
		return mapper.map(wishlistRepo.save(wishList), WishlistDto.class);
	}

	@Override
	public boolean CheckWishlistByUserAndBook(Integer userId, Integer bookId) {

		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException());
		System.out.println("2" + user);
		List<Wishlist> list = wishlistRepo.findByUser(user);
		boolean flag = false;
		for (Wishlist item : list) {
			if (item.getBook().getId() == bookId) {
				flag = true;
				break;
			}

		}
		return flag;
	}
@Override
	public List<WishlistDto> getAllWishList(Integer userId) {

		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException());
		List<Wishlist> list = wishlistRepo.findByUser(user);
		List<WishlistDto> listDto = new ArrayList<WishlistDto>();
		for (Wishlist item : list) {
			
			Book kk = bookRepo.findById(item.getBook().getId()).get();
			WishlistDto wishlistDto = mapper.map(item, WishlistDto.class);
			wishlistDto.setBook(mapper.map(kk,BookDto.class));
			
			boolean st=cartService.CheckCartByUserAndBook(userId, kk.getId());
			
			wishlistDto.setCartStatus(st);
		 listDto.add(wishlistDto);
			
			
			
			
		}
		return listDto;

	}
@Override
public String removeWishlist(Integer wishId ) {
	wishlistRepo.deleteById(wishId);

	return "Deleted Successefully";
	
}







}
