package com.app.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Payment;
import com.app.entities.Orders;
import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, UUID>{
	List<Payment> findByOrder(Orders order);
	
	List<Payment> findByOrder_id(Integer id);
}
