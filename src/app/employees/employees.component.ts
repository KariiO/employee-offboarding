import {Component, computed, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {EquipmentService} from '../api/employee.service';
import {TitleCasePipe} from '@angular/common';
import {FriendlyEquipmentsPipe} from '../pipes/friendly-equipments.pipe';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-employees',
  imports: [
    RouterLink,
    TitleCasePipe,
    FriendlyEquipmentsPipe,
    FormsModule
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
