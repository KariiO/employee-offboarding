import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {EquipmentService} from '../api/employee.service';
import {TitleCasePipe} from '@angular/common';
import {FriendlyEquipmentsPipe} from '../pipes/friendly-equipments.pipe';

@Component({
  selector: 'app-employees',
  imports: [
    RouterLink,
    TitleCasePipe,
    FriendlyEquipmentsPipe
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  private readonly _equipmentService = inject(EquipmentService);

  employeesResource = this._equipmentService.getAll();
}
