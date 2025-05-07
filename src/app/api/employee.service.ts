import {inject, Injectable, ResourceRef, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee, OffboardPayload} from '../models';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({providedIn: 'root'})
export class EquipmentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000';

  getAll(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(`${this.BASE_URL}/employees`);
  }

  get(id: Signal<string | undefined>): ResourceRef<Employee | undefined> {
    return rxResource({
      request: () => id(),
      loader: ({request}) => this._httpClient.get<Employee>(`${this.BASE_URL}/employees/${request}`)
    })
  }

  offboard(id: string, payload: OffboardPayload): Observable<void> {
    return this._httpClient.get<void>(`${this.BASE_URL}/employees/${id}/offboard`);
  }
}
