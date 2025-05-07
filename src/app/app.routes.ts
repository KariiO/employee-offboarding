import {Routes} from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeComponent} from './employee/employee.component';

export const routes: Routes = [
  {path: 'employees', component: EmployeesComponent,},
  {path: 'employees/:id', component: EmployeeComponent},
  {path: '**', redirectTo: 'employees'}
];
