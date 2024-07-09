import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, Color } from 'chart.js';
import { TaskService } from 'src/app/services/task.service';
import{ ITypePercentage } from 'src/app/interface/task.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true    
  };
  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: any[] = [];
  public doughnutChartColors: string[] = ['#f68059', '#ffbf3a', '#4e3dc8']; 
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [], label: 'Series A',backgroundColor:this.doughnutChartColors }    
    ];

    public typeData!: Array<ITypePercentage>;
    constructor(private taskService:TaskService){}   
  


  
  ngOnInit(): void {
    this.getTypePercentage();
  }  
  getTypePercentage():void{
    this,this.doughnutChartData=[];
    this.doughnutChartLabels=[];
    this.taskService.getTypePercentage().subscribe(
      (data: ITypePercentage[]) => {
        this.typeData=data;
        this.doughnutChartData = data.map(item => item.count); // Extract the counts into an array
        this.doughnutChartLabels = data.map(item => item.type); // Extract the types into an array
        
        // Update the datasets
        this.doughnutChartDatasets = [
          { data: this.doughnutChartData, label: 'Series A' ,backgroundColor: this.doughnutChartColors},
        ];       

    },error=>console.error(error)
  );
  } 
  refreshEmitter(){
    this.getTypePercentage();
  }
  

  
}