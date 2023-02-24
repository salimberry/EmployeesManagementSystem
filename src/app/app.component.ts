import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from './models/employees.models';
import { EmployeesService } from './services/employees.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('submitButton', {static: false}) submitButton!: ElementRef;
  title = 'FullStack.App';
  addEmployeeRequestForm: FormGroup;

constructor(private employeeService: EmployeesService, private router: Router) {
  this.addEmployeeRequestForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    salary: new FormControl('', [Validators.required, Validators.min(0)])
  });

  this.addEmployeeRequestForm.statusChanges.subscribe(status => {
    if (status === 'INVALID') {
      this.submitButton.nativeElement.disabled = true;
    } else {
      this.submitButton.nativeElement.disabled = false;
    }
  });
}


  ngOnInit(): void {
  }

  get form() { return this.addEmployeeRequestForm?.controls; } 
  addEmployee(){
    if (this.addEmployeeRequestForm?.invalid) {
      return;
    }
  
    const addEmployeeRequest: Employee = {
      id : '',
      name: this.form['name'].value,
      email : this.form['email'].value,
      phone : this.form['phone'].value,
      salary: this.form['salary'].value
    };
  
    this.employeeService.addEmployee(addEmployeeRequest)
      .subscribe({
        next : (employee)=>{
          this.addEmployeeRequestForm.reset();
          this.router.navigate(['employees']);
        },
        error: (err) => {
          if (err.status === 400) {
            alert('An Employee with this email or Number already exists!');
          } else {
            alert('Error occurred while adding employee!');
          }
        }
      });
   this.employeeService.getAllEmployees();
  }
  
  

}
