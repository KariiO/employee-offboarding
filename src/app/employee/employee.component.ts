import {Component, inject, input} from '@angular/core';
import {EquipmentService} from '../api/employee.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [
    RouterLink
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  private readonly _equipmentService = inject(EquipmentService);

  id = input<string>();
  employeeResource = this._equipmentService.get(this.id)
}
