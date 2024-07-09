package com.swati.TaskManagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swati.TaskManagement.dto.CountType;
import com.swati.TaskManagement.model.Task;
import com.swati.TaskManagement.service.TaskService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
@AllArgsConstructor
public class TaskController {
	
	private TaskService taskService;
	
	@GetMapping("/task")
	public List<Task> getTask(){
		return taskService.getTasks();
	}
	
	@GetMapping("/task/vData/percentcounttype")
	public List<CountType> getPercentageGroupByType(){
		return taskService.getPercentageGroupByType();
	}
	
	@GetMapping("/task/{id}")
	public Optional<Task> getTask(@PathVariable Long id){
		return taskService.getTaskById(id);
	}
	
	@PostMapping("/task")
	public Task addTask(@RequestBody Task task) {
		return taskService.save(task);
	}
	
	@PutMapping("/task/{id}")
	public ResponseEntity<?> addTask(@RequestBody Task taskPara,@PathVariable Long id) {
		if(taskService.existById(id)) {
			Task task=taskService.getTaskById(id).orElseThrow();
			task.setTitle(taskPara.getTitle());
			task.setDueDate(taskPara.getDueDate());
			task.setType(taskPara.getType());
			task.setDescription(taskPara.getDescription());
			
			taskService.save(task);
			return ResponseEntity.ok().body(task);
		}else {
			HashMap<String,String> message=new HashMap<>();
			message.put("message", id+"task not found or matched");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
	}
	
	@DeleteMapping("/task/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable Long id) {
		if(taskService.existById(id)) {			
			taskService.delete(id);
			HashMap<String,String> message=new HashMap<>();
			message.put("message", id+"task removed");
			return ResponseEntity.ok().body(message);
		}else {
			HashMap<String,String> message=new HashMap<>();
			message.put("message", id+"task not found or matched");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
		}
	}
	
	
	

}
