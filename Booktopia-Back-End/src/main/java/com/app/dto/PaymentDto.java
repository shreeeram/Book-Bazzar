package com.app.dto;

import java.util.UUID;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentDto {
	
	private UUID id;
	

	private Integer userID;
	
	
	private Integer orderID;
	
	private String paymentType;
	
	private String razPaymentId;
	
	private String razOrderId;
	
	private Double amount;
	
	private String paymentStatus;
	
	private boolean status;

	@Override
	public String toString() {
		return "PaymentDto [id=" + id + ", userID=" + userID + ", orderID=" + orderID + ", paymentType=" + paymentType
				+ ", razPaymentId=" + razPaymentId + ", razOrderId=" + razOrderId + ", amount=" + amount
				+ ", paymentStatus=" + paymentStatus + "]";
	}

	
	
	

}
