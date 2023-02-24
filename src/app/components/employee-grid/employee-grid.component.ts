import { Component } from '@angular/core';
import { Employee } from '../../models/employees.models';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatTableDataSource } from '@angular/material/table';


;

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent  {

 dataSource: Employee[] =[] ;
   
  constructor(private employeesService: EmployeesService){
  }
  ngOnInit(): void {
    this.employeesService.getAllEmployees()
    .subscribe({
      next :(employees) =>{  
 this.dataSource = employees;
      },
      error: (response) =>{
        console.log(response)
      }
    })}
  displayedColumns: string[] = ['name', 'email', 'number', 'salary'];
 
}
