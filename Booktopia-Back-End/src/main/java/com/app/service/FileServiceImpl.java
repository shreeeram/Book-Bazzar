package com.app.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Book;
import com.app.repo.BookRepo;

@Service
@Transactional
public class FileServiceImpl implements FileService {
	
	@Autowired
	private BookRepo bookRepo;
	
	@Value("${project.image}")
	private String path;

	@Override
	public String uploadImage(Integer bookId, MultipartFile imageFile) throws IOException {

		String name = imageFile.getOriginalFilename();

		String randomId = UUID.randomUUID().toString();

		String filename1 = randomId.concat(name.substring(name.lastIndexOf(".")));
		
		System.out.println(filename1);
		
		Book book = bookRepo.findById(bookId).get();
           
//		Product product = productRepo.findById(productId).orElseThrow(
//				() -> new ResourceNotFoundException("Invalid Product Id : Image Uploading failed!!!!!!!!"));
		// valid product : PERSISTENT --create complete path to the image
		String targetPath = path +  File.separator +  filename1;
		System.out.println(targetPath);
		
		Files.copy(imageFile.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
		
		book.setImg(filename1);
		
		

		return name;
	}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {

		String fullPath = path + File.separator + fileName;

		InputStream is = new FileInputStream(fullPath);

		return is;
	}

}
