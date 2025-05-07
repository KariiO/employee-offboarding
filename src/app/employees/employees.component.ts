import {Component, computed, inject, signal} from '@angular/core';
import {EquipmentService} from '../api/employee.service';
import {FormsModule} from '@angular/forms';
import {MatTab, MatTabGroup, MatTabLabel} from '@angular/material/tabs';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {EmployeesTableComponent} from './employees-table/employees-table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employees',
  imports: [
    FormsModule,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatInput,
    MatLabel,
    MatFormField,
    EmployeesTableComponent,
    MatProgressSpinner,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  private readonly _equipmentService = inject(EquipmentService);

  employeesResource = this._equipmentService.getAll();
  searchTerm = signal<string>('');
  employees = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();

    return this.employeesResource.value()?.filter(employee => {
      return employee.name.toLowerCase().includes(searchTerm) || employee.department.toLowerCase().includes(searchTerm);
    })
  })
}
