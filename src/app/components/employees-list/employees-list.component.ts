import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employees.models';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'number', 'salary', 'description'];
  dataSource = new MatTableDataSource<Employee>(this.employees);

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.dataSource.data = employees;
      },
      error: (response: any) => {
        console.log(response);
      }
    });
  }
}
