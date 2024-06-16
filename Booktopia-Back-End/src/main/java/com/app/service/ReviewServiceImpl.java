package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ReviewDto;
import com.app.entities.Review;
import com.app.repo.ReviewRepo;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private ReviewRepo revRepo;

	@Override
	public ReviewDto addReview(ReviewDto rv) {
		// TODO Auto-generated method stub
			rv.setDate(LocalDate.now());
		return mapper.map(revRepo.save(mapper.map(rv, Review.class)), ReviewDto.class);
	}

	@Override
	public List<ReviewDto> getReviewByBook(Integer bookId) {
		// TODO Auto-generated method stub
		System.out.println("service");
		List<ReviewDto> list = revRepo.findByBookId(bookId).stream().map((r) -> mapper.map(r, ReviewDto.class))
				.collect(Collectors.toList());
		System.out.println("do");
		return list;
	}
//	@Override
//	public List<Review> getReviewByBook(Integer bookId) {
//		// TODO Auto-generated method stub
//		System.out.println("service");
//		List<Review> list = revRepo.findByBookId(bookId);
//		System.out.println("do");
//		return list;
//	}

	@Override
	public boolean isReviewed(Integer userId, Integer bookId) {
if(revRepo.existsReview(userId, bookId).size()==0)return false;
else return true;
		
	}

}
