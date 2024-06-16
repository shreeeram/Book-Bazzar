package com.app.entities;

import java.util.UUID;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//"id": "pay_L0nSsccovt6zyp",
//"amount": 9900,
//"status": "captured",
//"order_id": "order_L0nS83FfCHaWqV",
//"invoice_id": "inv_L0nS7JIyuX6Lyb",
//"method": "card",
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "payment_details")
public class Payment {
	@Id
	@GeneratedValue
	private Integer transId;
	
	@ManyToOne
	private User user;
	
	@OneToOne
	private Orders order;
	
	private String paymentType;
	
	private Double amount;
	
//	private String razstatus;
	
	private String razPaymentId;
	
	private String razOrderId;
	
	
	
//	private String razInvoiceId;
	
//	private String razPayMethod;
	
	private String paymentStatus;
	

	@Override
	public String toString() {
		return "Payment [id=" + transId + ", user=" + user + ", paymentType=" + paymentType + ", amount=" + amount
				+ ", paymentStatus=" + paymentStatus + "]";
	}
	
	

}
