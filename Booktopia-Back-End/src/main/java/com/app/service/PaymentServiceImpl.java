package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.PaymentDto;
import com.app.entities.Orders;
import com.app.entities.Payment;
import com.app.entities.User;
import com.app.repo.OrderRepo;
import com.app.repo.PaymentRepo;
import com.app.repo.UserRepo;
@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
	
	@Autowired
	private PaymentRepo paymentRepo;

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private OrderRepo orderRepo;
	
	@Autowired 
	private ModelMapper mapper;

	@Override
	public List<PaymentDto> getPaymentByOrderId(Integer orderId) {
		Orders order=orderRepo.findById(orderId).get();
		List<Payment> order2 = paymentRepo.findByOrder(order);
		List<PaymentDto> list=new ArrayList<PaymentDto>();
		for (Payment payment : order2) {
			PaymentDto pd = mapper.map(payment,PaymentDto.class);
			list.add(pd);
			
		}
		return list ;
	}
	
	@Override
	public PaymentDto getPaymentByOrderrId(Integer orderId) {
		
		Orders order = orderRepo.findById(orderId).get();
		Payment payment = paymentRepo.findByOrder(order).get(0);
		//return paymentRepo.findByOrder_id(orderId) ;
		PaymentDto pd = mapper.map(payment, PaymentDto.class);
		if(pd.getRazPaymentId().length()>2) {
			pd.setStatus(true);
		}
		else {
			pd.setStatus(false);
		}
		
		return pd;
	}
	
	

	@Override
	public PaymentDto addPaymentDetail(PaymentDto paymentDto) {
		
		User user = userRepo.findById(paymentDto.getUserID()).get();
		Orders order=orderRepo.findById(paymentDto.getOrderID()).get();
		Payment payment= mapper.map(paymentDto, Payment.class);
		payment.setUser(user);
		payment.setOrder(order);
		paymentRepo.save(payment);
		
		return mapper.map(payment,PaymentDto.class); 
	}

}
