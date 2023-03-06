import { Component, NgModule, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employees.models';
import { EmployeesService } from 'src/app/services/employees.service';

import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatTableDataSource } from '@angular/material/table';
import { Routes } from '@angular/router';
const routes: Routes = [
  { path: 'employees/edit/:id', component: EditEmployeeComponent }
];


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent {
   employees : Employee[] =[] ;

  constructor(private employeesService: EmployeesService){

  }
  ngOnInit(): void {
    this.employeesService.getAllEmployees()
    .subscribe({
      next :(employees) =>{
        this.employees = employees
      },
      error: (response) =>{
        console.log(response)
      }
    })
  }
  displayedColumns: string[] = ['name', 'email', 'phone', 'salary', 'actions'];;

  dataSource = new MatTableDataSource<Employee>(this.employees);
}
