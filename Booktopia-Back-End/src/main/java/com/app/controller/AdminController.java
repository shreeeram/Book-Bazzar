package com.app.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.BookOrderDto;
import com.app.dto.CategoryDto;
import com.app.dto.SalesByMonthDTO;
import com.app.service.BookOrderService;
import com.app.service.BookService;
import com.app.service.CategoryService;
import com.app.service.FileService;
import com.app.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
	
	@Autowired
	private BookOrderService orderService;
	
	@Autowired
	private CategoryService catService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired 
	private BookService bookService;
	
	
	@GetMapping("/orders")
	public ResponseEntity<?> getAllOrders(){
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrder());
	}
	
	@PutMapping("/updatestatus/{id}/{status}")
	public ResponseEntity<?> updateOrder(@PathVariable Integer id, @PathVariable String status){
		return ResponseEntity.status(HttpStatus.OK).body(orderService.updateOrder(id, status));
	}
	
	@GetMapping("/month-report/{year}")
	public ResponseEntity<List<SalesByMonthDTO>> getTotalSalesByMonth( @PathVariable Integer year) {
        List<SalesByMonthDTO> dtoList =  orderService.getTotalSalesByMonth(year);
        return ResponseEntity.ok(dtoList);
    }
	
	@GetMapping("/ordercount")
	public ResponseEntity<?> getTotalSalesByMonth() {
        return ResponseEntity.ok(orderService.getOrderCount());
    }
	
	@GetMapping("/revenue")
	public ResponseEntity<?> getRevenue() {
        return ResponseEntity.ok(orderService.getRevenue());
    }
	
	@GetMapping("/usercount")
	public ResponseEntity<?> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }
	
	
	@PostMapping(value="/{bookId}/image",consumes = "multipart/form-data")
 	public ResponseEntity<?> uploadImageToServerSideFolder(@RequestParam MultipartFile imageFile,
 			@PathVariable Integer bookId
 			) throws IOException {
 		System.out.println("in upload img " + bookId + " " + imageFile.getOriginalFilename());
 		return new ResponseEntity<>(fileService.uploadImage(bookId, imageFile), HttpStatus.CREATED);
 	}
	
	
	@GetMapping("/piechart")
	public ResponseEntity<?> getPieValues() {
		
		List<BookOrderDto> allOrder = orderService.getAllOrder();
		
		List<Integer> list=new ArrayList<Integer>();
		
		Integer pending=0,processing=0,delivered=0;
		
		for (BookOrderDto orderItem : allOrder) {
			 if(orderItem.getStatus().equals("Order Recieved") ||orderItem.getStatus().equals("Order Processing")){
	                pending=pending+1;
	            }
	            else if(orderItem.getStatus().equals("Out for delivery") || orderItem.getStatus().equals("Order Packed")){
	                processing=processing+1;
	            }
	            else if(orderItem.getStatus().equals("Order delivered")){
	                delivered=delivered+1;
	            }
		}
	
		list.add(processing);	
		list.add(delivered);
		list.add(pending);
		
		
        return ResponseEntity.ok(list);
    }
	
	@PutMapping("/available/{bookId}")
	public ResponseEntity<?> makeAvailable(@PathVariable Integer bookId) {
        return ResponseEntity.ok(bookService.makeAvailable(bookId));
    }
	
	

}
