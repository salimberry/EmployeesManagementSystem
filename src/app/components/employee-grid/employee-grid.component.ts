import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employees.models';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent implements OnInit {

  dataSource: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'salary'];

  constructor(private employeeService: EmployeesService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe({
      next: employees => this.dataSource = employees,
      error: error => console.log(error),
      complete: () => console.log('Observable complete')
    });


  }
}
