package com.app.service;

import java.util.List;

import com.app.dto.PaymentDto;
import com.app.entities.Payment;

public interface PaymentService {
     public List<PaymentDto> getPaymentByOrderId(Integer orderId);
     
     public PaymentDto getPaymentByOrderrId(Integer orderId) ;
     
     public PaymentDto addPaymentDetail(PaymentDto paymentDto) ;
}
