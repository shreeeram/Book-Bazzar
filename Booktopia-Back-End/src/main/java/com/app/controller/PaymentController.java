package com.app.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.PaymentDto;
import com.app.service.BookOrderService;
import com.app.service.PaymentService;
import com.razorpay.*;
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
	@Autowired
private	BookOrderService orderService;
	@Autowired
private	PaymentService paymentService;
	
	@PostMapping("/create_order")
	public String placeOrderOnRazorpay(@RequestBody Map<String, Object> data) throws RazorpayException {
		RazorpayClient razorpayClient = new RazorpayClient("rzp_test_QQT1v9U5PAocCe", "m1OVibE8I1aQ2MNW1FPoPDoA");
		JSONObject options = new JSONObject();
		System.out.println("CREATE");
		System.out.println(data);
		int amt=Integer.parseInt(data.get("amt").toString());
		options.put("amount", amt*100);
		options.put("currency", "INR");
		options.put("receipt", "txn_123456");
		Order order = razorpayClient.Orders.create(options);
		System.out.println(order);
		
		//add payment data to database
		return order.toString();
	}
	@PostMapping("/update_order")
	public ResponseEntity<?>  upadtePayment(@RequestBody Map<String, Object> data){
		System.out.println("UPDATE");
		System.out.println(data);

		PaymentDto payDto=new PaymentDto();
		payDto.setUserID(Integer.parseInt(data.get("userId").toString()));
		payDto.setRazOrderId(data.get("order_id").toString());
		payDto.setRazPaymentId(data.get("payment_id").toString());
		payDto.setPaymentType(data.get("pymtType").toString());
		
		System.out.println(payDto);
		orderService.createOrder(payDto);
		
		
		//update payment data to database
		return ResponseEntity.ok("Payment Success");
	}
	
	@GetMapping("/getDetails/{oId}")
	public ResponseEntity<?>  getPaymentDetails(@PathVariable Integer oId ){
		
		return ResponseEntity.ok(paymentService.getPaymentByOrderrId(oId));
	}
}

