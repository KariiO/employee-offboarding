import {Component, inject, input} from '@angular/core';
import {FriendlyEquipmentsPipe} from '../../pipes/friendly-equipments.pipe';
import {TitleCasePipe} from '@angular/common';
import {Employee} from '../../models';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employees-table',
  imports: [
    FriendlyEquipmentsPipe,
    TitleCasePipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatNoDataRow
  ],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css'
})
export class EmployeesTableComponent {
  private _router = inject(Router)

  employees = input<Employee[]>([]);
  displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status', 'action'];

  onEmployeeClick(row: Employee): void {
    void this._router.navigate(['employees', row.id])
  }
}
