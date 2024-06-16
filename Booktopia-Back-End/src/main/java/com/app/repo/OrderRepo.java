package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Cart;
import com.app.entities.Orders;
import com.app.entities.User;


public interface OrderRepo extends JpaRepository<Orders, Integer> {

	public List<Orders> findByUser(User u);
	
	@Query("SELECT MONTHNAME(o.date) AS month, SUM(o.price) AS totalSales ,MONTH(o.date) AS monthid " +
	           "FROM Orders o where YEAR(o.date)= :year " +
	           "GROUP BY MONTHNAME(o.date),MONTH(o.date) ORDER BY MONTH(o.date)")
	 List<Object[]> getTotalSalesByMonth(@Param("year")Integer year); 
	
}
