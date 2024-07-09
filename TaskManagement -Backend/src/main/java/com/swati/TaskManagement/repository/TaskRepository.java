package com.swati.TaskManagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.swati.TaskManagement.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long> {
	
	@Query(value="Select * from task order by due_date asc",nativeQuery=true)
	public List<Task> getAllTaskDueDAteDesc();
	
	@Query(value = "SELECT CAST(COUNT(*) * 100 / (SELECT COUNT(*) FROM Task) AS UNSIGNED), type FROM Task GROUP BY type", nativeQuery = true)
	List<Object[]> getPercentageGroupByType();



}
