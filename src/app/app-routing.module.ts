import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';


const routes: Routes = [
 
  {
    path: 'employees',
    component: EmployeesListComponent
  }
  ,
  {
    path: 'employees/edit',
    component:EditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
