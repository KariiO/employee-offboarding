import {Component, DestroyRef, inject, input} from '@angular/core';
import {EquipmentService} from '../api/employee.service';
import {OffboardFormFactory, OffboardFormGroup} from './offboard-form-factory';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offboard',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './offboard.component.html',
  styleUrl: './offboard.component.css'
})
export class OffboardComponent {
  private readonly _equipmentService = inject(EquipmentService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  id = input<string>();
  form: FormGroup<OffboardFormGroup> = OffboardFormFactory.create();

  onConfirm(): void {
    const payload = this.form.getRawValue();

    this._equipmentService.offboard(this.id(), payload)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => this._router.navigateByUrl('/employees'),
        error: () => alert('Unable to perform offboard, try again later!'),
      })
  }
}
