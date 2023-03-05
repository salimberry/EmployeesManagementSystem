import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enivironment/envirinment';

import { Employee } from '../models/employees.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<any>(`${this.baseApiUrl}/api/Employees`).pipe(
      map(response => response.data) // extract the data property from the response
    );
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    addEmployeeRequest.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<Employee>(`${this.baseApiUrl}/api/Employees`, addEmployeeRequest);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<any>(`${this.baseApiUrl}/api/Employees/${id}`).pipe(
      map(response => response.data)
    );
  }

  updateEmployee(id: string, updatedEmployeeRequest: Employee): Observable<Employee> {
    return this.http.put<any>(`${this.baseApiUrl}/api/Employees/${id}`, updatedEmployeeRequest);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseApiUrl}/api/Employees/${id}`);
  }
}
