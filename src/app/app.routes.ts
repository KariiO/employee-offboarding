import {Routes} from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeComponent} from './employee/employee.component';
import {OffboardComponent} from './offboard/offboard.component';

export const routes: Routes = [
  {path: 'employees', component: EmployeesComponent,},
  {path: 'employees/:id', component: EmployeeComponent},
  {path: 'employees/:id/offboard', component: OffboardComponent},
  {path: '**', redirectTo: 'employees'}
];
