import { inject, Injectable, ResourceRef, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Employee, OffboardPayload } from '../models';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class EquipmentService {
  private readonly _httpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000';

  getAll(): ResourceRef<Employee[] | undefined> {
    return rxResource({
      loader: () => {
        // return throwError(() => new HttpErrorResponse({status: 400}))

        return this._httpClient.get<Employee[]>(`${this.BASE_URL}/employees`).pipe(delay(1000));
      },
    });
  }

  get(id: Signal<string | undefined>): ResourceRef<Employee | undefined> {
    return rxResource({
      request: () => id(),
      loader: ({ request }) => this._httpClient.get<Employee>(`${this.BASE_URL}/employees/${request}`).pipe(delay(1000)),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  offboard(id: string | undefined, payload: OffboardPayload): Observable<unknown> {
    return of(null).pipe(delay(1000));
    // return this._httpClient.post<void>(`${this.BASE_URL}/employees/${id}/offboard`, payload);
  }
}
