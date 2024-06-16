package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CartDto;
import com.app.dto.PaymentDto;
import com.app.dto.UserDto;
import com.app.dto.WishlistDto;
import com.app.entities.User;
import com.app.service.BookOrderService;
import com.app.service.CartService;
import com.app.service.UserService;
import com.app.service.WishlistService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private CartService cartService;

	@Autowired
	private BookOrderService orderService;
	
	@Autowired
	private WishlistService wishListService;
//	
//	@PostMapping("/signin")
//	public ResponseEntity<?> getUserByEmailandPassword(@RequestBody UserDto userDto) {
//		System.out.println(userDto);
//		return ResponseEntity.status(HttpStatus.FOUND).body(userService.getUserByEmailAndPassword(userDto));
//	}
//
//	@PostMapping("/signup")
//	public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
//		return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
//	
//	}
	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateUser(user));
	}

	@PostMapping("/cart")
	public ResponseEntity<?> addToCart(@RequestBody CartDto cartDto) {
		System.out.println(cartDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addCart(cartDto));
	}
	
	@GetMapping("/check/{id}")
	public ResponseEntity<?> checkCart(@PathVariable Integer id) {
		return new ResponseEntity<>(cartService.CheckCartByUser(id), HttpStatus.OK);
	}
	

	@GetMapping("/order/{ptype}/{userId}")
	public ResponseEntity<?> order(@PathVariable Integer userId, @PathVariable String ptype) {
		System.out.println(userId);
		System.out.println(ptype);
		
		PaymentDto payDto=new PaymentDto();
		payDto.setUserID(userId);
		payDto.setPaymentType(ptype);
		orderService.createOrder(payDto);
		return ResponseEntity.status(HttpStatus.OK).body("Order placed");
	}

	@GetMapping("/order/{id}")
	
	public ResponseEntity<?> getOrderByUser(@PathVariable Integer id) {
		
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrderByUser(id));
	}

	@PostMapping("/cartQuantUpdate/{id}/{quant}")
	public ResponseEntity<?> updateQuantity(@PathVariable Integer id, @PathVariable Integer quant) {
		return ResponseEntity.status(HttpStatus.OK).body(cartService.updateQuantity(id, quant));
	}
	
	@DeleteMapping("/cart/{id}")
	public ResponseEntity<?> deleteCart(@PathVariable Integer id) {
		cartService.deleteCart(id);
		return new ResponseEntity<>("Cart Deleted Sucessfully", HttpStatus.OK);
	}
	
	@GetMapping("/carts/{userID}")
	public ResponseEntity<?> getCartListByUser(@PathVariable Integer userID) {
		return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartByUser(userID));
	}
	
	@GetMapping("/checks/{userId}/{bookId}")
	public ResponseEntity<?> checkCarttt(@PathVariable Integer userId,@PathVariable Integer bookId) {
		return new ResponseEntity<>(cartService.CheckCartByUserAndBook(userId,bookId), HttpStatus.OK);
	}
	
	
	
	@GetMapping("/wishlist/{userID}")
	public ResponseEntity<?> getWishListByUser(@PathVariable Integer userID) {
		return ResponseEntity.status(HttpStatus.OK).body(wishListService.getAllWishList(userID));
	}
	
	@GetMapping("/wishlist/{userId}/{bookId}")
	public ResponseEntity<?> checkWishList(@PathVariable Integer userId,@PathVariable Integer bookId) {
		return new ResponseEntity<>(wishListService.CheckWishlistByUserAndBook(userId, bookId), HttpStatus.OK);
	}
	
	@PostMapping("/wishlist")
	public ResponseEntity<?> addToWishList(@RequestBody WishlistDto wishlistDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(wishListService.addToWishList(wishlistDto));
	}
	
	@DeleteMapping("/wishlist/{wishID}")
	public ResponseEntity<?> deleteWishList(@PathVariable Integer wishID) {
		return ResponseEntity.status(HttpStatus.OK).body(wishListService.removeWishlist(wishID));
	}

}
