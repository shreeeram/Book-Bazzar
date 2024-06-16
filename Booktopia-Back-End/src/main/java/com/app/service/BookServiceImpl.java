package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.BookDto;
import com.app.dto.CategoryDto;
import com.app.dto.ReviewDto;
import com.app.entities.Book;
import com.app.entities.Cart;
import com.app.entities.Category;
import com.app.entities.Review;
//import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.BookResponse;
import com.app.repo.BookRepo;
import com.app.repo.CartRepo;
import com.app.repo.categoryRepo;

@Service
@Transactional
public class BookServiceImpl implements BookService {
	@Autowired
	private BookRepo bookRepo;

	@Autowired
	private categoryRepo cateRepo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private CategoryService catService;

	@Autowired
	private FileService fileService;

	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private ReviewService reviewService;

	@Value("${project.image}")
	private String path;

	@Override
	public BookDto addbook(BookDto bdto) {
//		System.out.println("servide before");
//		
		System.out.println(bdto);
		Category cat = catService.getCategory(bdto.getCategory());
		Book book = mapper.map(bdto, Book.class);
		book.setCategory(cat);

//		if (!file.isEmpty()) {
//			book.setImg(file.getOriginalFilename());
//		} else {
//			book.setImg("default.jpg");
//		}
		book.setStatus(1);

		Book newBook = bookRepo.save(book);
		System.out.println("servide savebook");

//		if (newBook != null) {
//			try {
//				fileService.uploadImage(path, file);
//			} catch (IOException e) {
//
//				e.printStackTrace();
//			}
//		}
		System.out.println("servide after updload");
		BookDto ret = mapper.map(bookRepo.save(book), BookDto.class);
		System.out.println("RRRR"+ret);

		return ret;
	}

	@Override
	public BookDto getBookById(Integer id) {
		Book b = bookRepo.findById(id).orElseThrow(null);
		List<ReviewDto> list= reviewService.getReviewByBook(id);
	
	Double sum=0.0;
	  for (ReviewDto reviewDto : list) {
		sum=sum+reviewDto.getRating();
	}
		BookDto bookDto = mapper.map(b, BookDto.class);
		bookDto.setCategory(b.getCategory().getCategoryName());
		bookDto.setAvgRating(sum/list.size());
		
		return bookDto;
	}

	@Override
	public BookDto updateBook(BookDto bookDto) {
		Book b = bookRepo.findById(bookDto.getId()).orElseThrow(null);

		System.out.println(bookDto.getCategory());
		Category cat = catService.getCategory(bookDto.getCategory());

//		if (file != null) {
//			b.setImg(file.getOriginalFilename());
//			try {
//				System.out.println("in upload");
//				fileService.uploadImage(path, file);
//			} catch (IOException e) {
//
//				e.printStackTrace();
//			}
//		}

		b.setBookName(bookDto.getBookName());
		b.setAuthor(bookDto.getAuthor());
		b.setCategory(cat);
		b.setIsbnNo(bookDto.getIsbnNo());
		b.setPrice(bookDto.getPrice());
		b.setLanguage(bookDto.getLanguage());
		b.setDescription(bookDto.getDescription());

		return mapper.map(bookRepo.save(b), BookDto.class);
	}

	@Override
	public void deleteBook(Integer id) {

		Book b = bookRepo.findById(id).orElseThrow(null);
		cartRepo.findByBook(b).forEach(cart -> cartRepo.delete(cart));
		b.setStatus(0);
		bookRepo.save(b);
	}

	@Override
	public List<BookDto> searchBook(String ch) {
		return bookRepo.search(ch).stream().map((e) -> mapper.map(e, BookDto.class)).collect(Collectors.toList());
	}
	
	@Override
	public List<BookDto> getAllBooksList() {
		List<Book> books = bookRepo.findAll();
		System.out.println(books);
		List<BookDto> bookDto=new ArrayList<BookDto>();
		for (Book book : books) {
			BookDto bookDto2 = mapper.map(book,BookDto.class);
			bookDto2.setCategory	(book.getCategory().getCategoryName());
			bookDto.add(bookDto2);
		}
		System.out.println(bookDto);
		return bookDto;
	}
	
	@Override
	public BookResponse getAllBooks(int pageNo, int pageSize, String sortBy, String sortDir) {

		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();

		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

		Page<Book> pageList = bookRepo.findAll(pageable);

		List<Book> list = pageList.getContent();
		
		int count=list.size();

		List<BookDto> bookDtoList = list.stream().map((book) -> mapper.map(book, BookDto.class))
				.collect(Collectors.toList());

		BookResponse bookResponse = new BookResponse();
		bookResponse.setBook(bookDtoList);
		bookResponse.setPageNumber(pageList.getNumber());
		bookResponse.setPageSize(pageList.getSize());
		bookResponse.setTotalElements(pageList.getTotalElements());
		bookResponse.setTotalPages(pageList.getTotalPages());
		bookResponse.setLastPage(pageList.isLast());
	

		return bookResponse;
	}
	@Override
	public String getBookImg(Integer bookId) {
		Book b = bookRepo.findById(bookId).orElseThrow(null);
		return b.getImg();
		
	}
	
	@Override
	public Long getBookCount() {
		return bookRepo.count();
	}
    
	@Override
	public String makeAvailable(Integer bookId) {
		Book b = bookRepo.findById(bookId).orElse(new Book());
		b.setStatus(1);
		bookRepo.save(b);
		return "Now Book Is Available";
	}
}
