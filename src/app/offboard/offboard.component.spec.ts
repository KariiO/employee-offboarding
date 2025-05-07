import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardComponent } from './offboard.component';
import { EquipmentService } from '../api/employee.service';
import { of, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

describe('OffboardComponent', () => {
  let component: OffboardComponent;
  let fixture: ComponentFixture<OffboardComponent>;
  let equipmentService: jasmine.SpyObj<EquipmentService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;
  let dialogRefClose: jasmine.Spy;

  beforeEach(() => {
    dialogRefClose = jasmine.createSpy('DialogRef.close');
    equipmentService = jasmine.createSpyObj('EquipmentService', ['offboard']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    matDialog.open.and.returnValue({ close: dialogRefClose } as unknown as MatDialogRef<unknown>);
    equipmentService.offboard.and.returnValue(of(null));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardComponent],
      providers: [
        {
          provide: EquipmentService,
          useValue: equipmentService,
        },
        {
          provide: MatDialog,
          useValue: matDialog,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm offboard with success', () => {
    const data = {
      address: {
        streetLine1: 'Kocmyrzowska 1',
        country: 'Poland',
        postalCode: '13-231',
        receiver: 'Stefan Batory',
        city: 'Poznań',
      },
      notes: 'some text',
      phone: '+48123123123',
      email: 'someemail@gmail.com',
    };
    component.form.setValue(data);

    component.onConfirm();

    expect(equipmentService.offboard).toHaveBeenCalledWith('123', data);
    expect(dialogRefClose).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/employees');
  });

  it('should confirm offboard with error', () => {
    const data = {
      address: {
        streetLine1: 'Kocmyrzowska 1',
        country: 'Poland',
        postalCode: '13-231',
        receiver: 'Stefan Batory',
        city: 'Poznań',
      },
      notes: 'some text',
      phone: '+48123123123',
      email: 'someemail@gmail.com',
    };
    component.form.setValue(data);
    equipmentService.offboard.and.returnValue(throwError(() => new Error()));
    const alertSpy = spyOn(window, 'alert');

    component.onConfirm();

    expect(equipmentService.offboard).toHaveBeenCalledWith('123', data);
    expect(alertSpy).toHaveBeenCalledWith('Unable to perform offboard, try again later!');
    expect(dialogRefClose).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should go back to employee details on cancel', () => {
    component.onCancel();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/employees/123');
  });
});
