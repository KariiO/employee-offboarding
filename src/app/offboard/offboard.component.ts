import {Component, DestroyRef, effect, inject, input, TemplateRef, viewChild} from '@angular/core';
import {EquipmentService} from '../api/employee.service';
import {OffboardFormFactory, OffboardFormGroup} from './offboard-form-factory';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-offboard',
  imports: [
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatError
  ],
  templateUrl: './offboard.component.html',
  styleUrl: './offboard.component.css'
})
export class OffboardComponent {
  offboardDialogTemplate = viewChild<TemplateRef<unknown>>('offboardDialog');

  private readonly _equipmentService = inject(EquipmentService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _dialog = inject(MatDialog);

  private _dialogRef!: MatDialogRef<unknown>;

  id = input<string>();
  form: FormGroup<OffboardFormGroup> = OffboardFormFactory.create();

  constructor() {
    effect(() => {
      const offboardDialogTemplate = this.offboardDialogTemplate();

      if (offboardDialogTemplate) {
        this._dialogRef = this._dialog.open(offboardDialogTemplate, {
          hasBackdrop: false,
          width: '640px'
        })
      }
    });
  }

  onConfirm(): void {
    const payload = this.form.getRawValue();

    this._equipmentService.offboard(this.id(), payload)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._dialogRef.close();
          void this._router.navigateByUrl('/employees')
        },
        error: () => alert('Unable to perform offboard, try again later!'),
      })
  }

  onCancel(): void {
    void this._router.navigate(['employees', this.id()]);
  }
}
