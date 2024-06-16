package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.ReviewDto;
import com.app.entities.Review;

public interface ReviewRepo extends JpaRepository<Review, Integer>{

	public List<Review> findByBookId(Integer bookId);
	
	@Query("select id from Review where custId=?1 and bookId=?2")
	public List<Object[]> existsReview(Integer custId , Integer bookId );
}
