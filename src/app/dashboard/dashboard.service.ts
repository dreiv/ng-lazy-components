import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() {}

  getWidgets(): Observable<{ type: string }[]> {
    return timer(300).pipe(
      mapTo([
        {
          type: 'bar'
        },
        {
          type: 'funnel'
        }
      ])
    );
  }
}
