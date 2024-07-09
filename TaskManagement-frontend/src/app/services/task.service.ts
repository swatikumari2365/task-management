import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITask, ITaskTypeOption, ITypePercentage } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/api/v1/task';

  constructor(private httpClient: HttpClient) {}

  getTaskList(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(this.apiUrl).pipe(
      map((d: ITask[]) => d)
    );
  }

  getTaskById(id:string):Observable<ITask>{
    return this.httpClient.get<ITask>(`http://localhost:8080/api/v1/task/${id}`).pipe(
      map((d: ITask) => d)
    );
  }

  getTypeOptions():Array<ITaskTypeOption>{
    return[{type:'done'},{type:'pending'},{type:'todo'}]
  }

  postTaskList(task: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(this.apiUrl, task).pipe(
      map((d: ITask) => d)
    );
  }

  updateTask(task: ITask, id: string): Observable<ITask> {
    return this.httpClient.put<ITask>(`http://localhost:8080/api/v1/task/${id}`, task).pipe(
      map((d: ITask) => d)
    );
  }

  deleteTask(id:string){
    return this.httpClient.delete<ITask>(`http://localhost:8080/api/v1/task/${id}`);    
  }
  getTypePercentage():Observable<ITypePercentage[]>{
    return this.httpClient.get<ITypePercentage[]>(`http://localhost:8080/api/v1/task/vData/percentcounttype`).pipe(
      map((d: ITypePercentage[]) => d)
    );
  }

  
  
}
