import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from 'src/app/models/employees.models';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  errorMessage: string = '';
  employeeDetails:Employee= {
    id : '',
    name: '',
    email : '',
    phone : 0,
    salary: 0
  };
  editEmployeeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {
    this.editEmployeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      salary: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const id = params['id'];
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
              this.editEmployeeForm.setValue({
                name: response.name,
                email: response.email,
                phone: response.phone,
                salary: response.salary
              });
            }
          });
        }
      }
    });
  }


  get form() { return this.editEmployeeForm.controls; }

  updateEmployee(){
    if (this.editEmployeeForm?.invalid) {
      return;
    }
    const updatedEmployee: Employee = {
      id: this.employeeDetails.id,
      name: this.form['name'].value,
      email: this.form['email'].value,
      phone: this.form['phone'].value,
      salary: this.form['salary'].value
    };

    this.employeeService.updateEmployee(updatedEmployee.id, updatedEmployee)
      .subscribe({
        next :(response)=>{
          alert('Employee details updated successfully!');
          this.router.navigate(['employees']);
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee? Click Ok to delete')) {
      this.employeeService.deleteEmployee(this.employeeDetails.id).subscribe({
        next: (response) => {
          this.router.navigate(['employees']).then(() => {
            alert('Employee deleted successfully!');
          });
        }
      });
    }
  }


}
