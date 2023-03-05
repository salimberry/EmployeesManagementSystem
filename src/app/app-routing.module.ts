import { NgModule } from '@angular/core';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeGridComponent } from './components/employee-grid/employee-grid.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmployeeGridComponent
  },
  {
    path: 'employees',
    component: EmployeesListComponent
  }
  ,
  {
    path: 'employees/edit',
    component:EditEmployeeComponent
  },
  {
    path : 'employees/grid',
    component : EmployeeGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
