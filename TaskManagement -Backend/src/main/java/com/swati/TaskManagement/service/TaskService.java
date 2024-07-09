package com.swati.TaskManagement.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.swati.TaskManagement.dto.CountType;
import com.swati.TaskManagement.model.Task;
import com.swati.TaskManagement.repository.TaskRepository;


import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TaskService {
	private TaskRepository taskRepository;
	
	
	public List<Task> getTasks(){
		return taskRepository.getAllTaskDueDAteDesc();
	}
	
	public Task save(Task task) {
		return taskRepository.saveAndFlush(task);
		
	}
	
	public boolean existById(Long id) {
		return taskRepository.existsById(id);
	}
	
	public Optional<Task> getTaskById(Long id) {
		return taskRepository.findById(id);
	}
	
	
	public void delete(Long id) {		
		taskRepository.deleteById(id);		
	}
	
	public List<CountType> getPercentageGroupByType() {
		List<Object[]> results = taskRepository.getPercentageGroupByType();
        List<CountType> countTypeList = new ArrayList<>();
        
        for (Object[] result : results) {
            Integer count = ((Number) result[0]).intValue();
            String type = (String) result[1];
            countTypeList.add(new CountType(count, type));
        }
        
        return countTypeList;
	}

}
