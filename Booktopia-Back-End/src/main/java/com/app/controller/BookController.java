
package com.app.controller;

import javax.servlet.http.HttpServletRequest;

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
import static org.springframework.http.MediaType.*;

import java.io.IOException;

import com.app.dto.BookDto;
import com.app.dto.ReviewDto;
import com.app.service.BookService;
import com.app.service.CategoryService;
import com.app.service.FileService;
import com.app.service.ReviewService;

@RestController
@CrossOrigin
@RequestMapping("/api/book")
public class BookController {
	@Autowired
	private BookService bookService;
	
	@Autowired
	private CategoryService catService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private ReviewService reviewService;
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/add")
	
	public ResponseEntity<?> createBook(@RequestBody BookDto book) {
					System.out.println(book);
		return new ResponseEntity<>(bookService.addbook(book), HttpStatus.CREATED);
	}
//	@PreAuthorize("hasRole('ADMIN')")
//	@PostMapping(value="/update",consumes = "multipart/form-data")
//	public ResponseEntity<?> updateBook(@RequestParam Integer id,
//			@RequestParam String bookName ,
//			@RequestParam String author,
//			@RequestParam String description,
//			@RequestParam String category,
//			@RequestBody MultipartFile file) {
//		BookDto bookDto=new BookDto();
//		bookDto.setBookName(bookName);
//		bookDto.setAuthor(author);
//		bookDto.setId(id);
//		bookDto.setDescription(description);
//		bookDto.setCategory(category);
//		
//		System.out.println(bookDto);
//		return new ResponseEntity<>(bookService.updateBook(bookDto, file), HttpStatus.OK);
//	}
	
	@PutMapping(value="/update/{bookId}")
	public ResponseEntity<?> updateBook(@PathVariable Integer bookId,
			@RequestBody BookDto book) {
		
		
		//System.out.println(file==null);
		return new ResponseEntity<>(bookService.updateBook(book), HttpStatus.OK);
	}
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(value = "/ghfjrj" , consumes = "multipart/form-data")
	public ResponseEntity<?> addBook(@RequestParam("file") MultipartFile file ){
		System.out.println("so");
		return ResponseEntity.status(HttpStatus.CREATED).body(bookService.addbook(null)) ;
	}
	
	@GetMapping("/pages")
	public ResponseEntity<?> getAllBookByPagination(

			@RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,

			@RequestParam(value = "pageSize", defaultValue = "8", required = false) int pageSize,

			@RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,

			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		
		System.out.println(pageNo+""+pageSize+""+sortBy+""+sortDir);
		return new ResponseEntity<>(bookService.getAllBooks(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getBookById(@PathVariable Integer id) {
		System.out.println("dsfdsf");
		BookDto dto = bookService.getBookById(id);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable Integer id) {
		bookService.deleteBook(id);
		return new ResponseEntity<>("StatusUpdated Sucessfully", HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<?> search(@RequestParam String ch) {
	
		return new ResponseEntity<>(bookService.searchBook(ch), HttpStatus.OK);
	}
	
	@GetMapping("/categorysearch/{catId}")
	public ResponseEntity<?> searchByCategory(@PathVariable Integer catId) {
		System.out.println(catId);
		return new ResponseEntity<>(catService.getBookByCategory(catId), HttpStatus.OK);
	}
	
	
	@GetMapping("/categories")
	public ResponseEntity<?> getCategories() {
		return new ResponseEntity<>(catService.getAllCategory(), HttpStatus.OK);
	}
	
	
	@PostMapping("/review")
	public ResponseEntity<?> addReview(@RequestBody ReviewDto reviewDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(reviewDto)) ;
	}
	
	@GetMapping("/reviews/{id}")
	public ResponseEntity<?> getReviews(@PathVariable  Integer id) {
		return new ResponseEntity<>(reviewService.getReviewByBook(id), HttpStatus.OK);
	}
	
	@GetMapping("/reviewExist/{userId}/{bookId}")
	public ResponseEntity<?> getReviewStatus(@PathVariable  Integer userId, @PathVariable  Integer bookId) {
		return new ResponseEntity<>(reviewService.isReviewed(userId, bookId) , HttpStatus.OK);
	}
	
	@GetMapping("/allbooks")
	public ResponseEntity<?> getAllBooks() {
		return new ResponseEntity<>(bookService.getAllBooksList(), HttpStatus.OK);
	}
	
	@GetMapping("/allbooks/count")
	public ResponseEntity<?> getBooksCount() {
		return new ResponseEntity<>(bookService.getAllBooksList(), HttpStatus.OK);
	}
	
	@GetMapping("/getBookCount")
	public ResponseEntity<?> getRevenue() {
        return ResponseEntity.ok(bookService.getBookCount());
    }
	
	
	@PostMapping(value="/{bookId}/image",consumes = "multipart/form-data")
 	public ResponseEntity<?> uploadImageToServerSideFolder(@RequestParam MultipartFile imageFile,
 			@PathVariable Integer bookId
 			) throws IOException {
 		System.out.println("in upload img " + bookId + " " + imageFile.getOriginalFilename());
 		return new ResponseEntity<>(fileService.uploadImage(bookId, imageFile), HttpStatus.CREATED);
 	}
	
	
	
	

}
