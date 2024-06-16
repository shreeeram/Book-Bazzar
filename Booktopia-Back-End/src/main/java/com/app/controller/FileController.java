package com.app.controller;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.service.FileService;

@CrossOrigin
@Controller
public class FileController {

	@Value("${project.image}")
	private String path;

	@Autowired
	private FileService fileService;

	@GetMapping(value = "/{imgName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void downloadFile(@PathVariable String imgName, HttpServletResponse response) throws IOException {

		InputStream resource = fileService.getResource(path, imgName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());

	}

	/*
	 * @Autowired private StorageService storageService;
	 * 
	 * @RequestMapping(value="/{fileName}", produces = "image/*") public void
	 * download(@PathVariable("fileName") String fileName, HttpServletResponse resp)
	 * { System.out.println("Loading file: " + fileName); Resource resource =
	 * storageService.load(fileName); if(resource != null) { try(InputStream in =
	 * resource.getInputStream()) { ServletOutputStream out =
	 * resp.getOutputStream(); FileCopyUtils.copy(in, out); } catch (IOException e)
	 * { e.printStackTrace(); } } }
	 */

}
