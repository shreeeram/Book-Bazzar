package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repo.BookRepo;
import com.app.repo.CartRepo;
import com.app.repo.OrderRepo;
import com.app.repo.PaymentRepo;
import com.app.repo.UserRepo;



import com.app.dto.*;
import com.app.entities.*;

//import io.jsonwebtoken.Claims;

@Service
public class BookOrderServiceImpl implements BookOrderService {

	@Autowired
	private OrderRepo bookOrderRepo;

	@Autowired
	private ModelMapper mapper;


	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CartService cartService;
	
	@Autowired
	private BookRepo bookRepo;
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private PaymentRepo payRepo; 

//
//	public int getUserId(HttpServletRequest request) {
//		Claims claim = jwtProvide.extractClaims(request);
//		int userId = claim.get("userId", Integer.class);
//		return userId;
//	}

	@Override
	public List<com.app.dto.BookOrderDto> createOrder(PaymentDto payDto) {
System.out.println(payDto.getUserID()+"     1   "+payDto.getPaymentType());
		List<CartDto> cartList = cartService.getCartByUser(payDto.getUserID());

		List<BookOrderDto> orderListDto = new ArrayList<BookOrderDto>();

		BookOrderDto bookOrder;
		Random random = new Random();
	//	System.out.println(userId+"     2   "+ptype);
		for (CartDto c : cartList) {
			Book book1 = bookRepo.findById(c.getBookId()).get();
			bookOrder = new BookOrderDto();
			bookOrder.setBook(mapper.map(book1, BookDto.class) );
			bookOrder.setUser(mapper.map(userRepo.findById(c.getUserId()).get(), UserDto.class) );
			bookOrder.setQuantity(c.getQuantity());
			bookOrder.setPaymentType(payDto.getPaymentType());
			bookOrder.setOrderNumber("ORD-" + random.nextInt(1000));
			bookOrder.setDate(LocalDate.now());
			bookOrder.setStatus("Order Processing");
			bookOrder.setPrice(c.getQuantity()* book1.getPrice());
			orderListDto.add(bookOrder);
			
		}
	//	System.out.println(userId+"    3    "+ptype);
		List<Orders> orderList = orderListDto.stream().map((e) -> mapper.map(e, Orders.class))
				.collect(Collectors.toList());

		List<Orders> orderSucess = bookOrderRepo.saveAll(orderList);
	//	System.out.println(userId+"    4    "+ptype);
		
		System.out.println(orderSucess);
		if(!orderSucess.isEmpty())
		{   
			for (Orders orders : orderSucess) {
				if(payDto.getPaymentType().equals("COD")) {
				     Payment pay=new Payment();
				     
				     pay.setOrder(orders);
				     pay.setPaymentStatus("pending");
				     pay.setPaymentType("Cash");
				     pay.setUser(userRepo.findById(payDto.getUserID()).get());
				     pay.setAmount(orders.getPrice());
				     pay.setRazOrderId("0");
				     pay.setRazPaymentId("0");
				     
				     payRepo.save(pay);
				     
				}
				else {
					Payment pay=new Payment();
				     
				     pay.setOrder(orders);
				     pay.setPaymentStatus("Received");
				     pay.setPaymentType("Online-Razorpay");
				     pay.setUser(userRepo.findById(payDto.getUserID()).get());
				     pay.setAmount(orders.getPrice());
				     pay.setRazOrderId(payDto.getRazOrderId());
				     pay.setRazPaymentId(payDto.getRazPaymentId());
				     
				     payRepo.save(pay);

				}
			}
			
			 
			for (CartDto c : cartList) {
				cartRepo.delete(mapper.map(c,Cart.class));
			}
		}
		
	//	System.out.println(userId+"    5    "+ptype);
		return orderSucess.stream().map((e) -> mapper.map(e, BookOrderDto.class)).collect(Collectors.toList());
	}
	
	
	
	

	@Override
	public List<BookOrderDto> getOrderByUser(Integer userId) {

		User user = userRepo.findById(userId).get();

		List<Orders> list = bookOrderRepo.findByUser(user);
		System.out.println(list);
		list.sort((x,y)->y.getId()-x.getId());
		

		return list.stream().map((e) -> mapper.map(e, BookOrderDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<BookOrderDto> getAllOrder() {
		List<Orders> list = bookOrderRepo.findAll();
		list.sort((x,y)->y.getId()-x.getId());
		return list.stream().map((e) -> mapper.map(e, BookOrderDto.class)).collect(Collectors.toList());
	}

	
	public BookOrderDto updateOrder(Integer id, String st) {

		Orders bookOrd = bookOrderRepo.findById(id).get();
		bookOrd.setStatus(st);
		Orders updtbkOrd = bookOrderRepo.save(bookOrd);
		return mapper.map(bookOrd, BookOrderDto.class);
	}
	
	@Override
	public List<SalesByMonthDTO> getTotalSalesByMonth(Integer year){
		return mapResultsToDTO(bookOrderRepo.getTotalSalesByMonth(year));
	}
	
    public List<SalesByMonthDTO> mapResultsToDTO(List<Object[]> results) {
        List<SalesByMonthDTO> dtoList = new ArrayList<>();
        for (Object[] result : results) {
            String month = (String) result[0];
            Double totalSales = (Double) result[1];
            SalesByMonthDTO dto = new SalesByMonthDTO(month, totalSales);
            dtoList.add(dto);
        }
        return dtoList;
    }
    @Override
    public Double getRevenue() {
    	
    	List<Orders> list = bookOrderRepo.findAll();
    	double count=0;
    	for (Orders order : list) {
    		count=count+order.getPrice();
		}
    	return count;
    	
    }
    @Override
    public Long getOrderCount() {
    	return bookOrderRepo.count();
    }
}
