import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { ShowComponent } from '../show/show.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Output() refreshEmitter=new EventEmitter<boolean>();
  tasks:Observable<ITask[]> | undefined;
  constructor(private taskService:TaskService,private dialog:MatDialog){}
  ngOnInit(): void {
    this.getTasks();
      
  }
  getTasks(){
    this.tasks=this.taskService.getTaskList();
  }
  onOpenDialog(task:ITask){
    const dialogRef = this.dialog.open(ShowComponent, {      
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshEmitter.emit(true);
    });
  
  }
}
