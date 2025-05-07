import {Component, inject, input} from '@angular/core';
import {EquipmentService} from '../api/employee.service';
import {RouterLink} from '@angular/router';
import {MatList, MatListItem} from '@angular/material/list';
import {MatAnchor} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee',
  imports: [
    RouterLink,
    MatList,
    MatListItem,
    MatIcon,
    MatAnchor,
    MatProgressSpinner,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  private readonly _equipmentService = inject(EquipmentService);

  id = input<string>();
  employeeResource = this._equipmentService.get(this.id)
}
