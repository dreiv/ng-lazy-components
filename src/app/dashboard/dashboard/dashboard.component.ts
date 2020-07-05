import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  widgets$!: Observable<any>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): any {
    this.widgets$ = this.dashboardService.getWidgets().pipe(
      mergeMap((widgets) => {
        return Promise.all(
          widgets.map((widget) => {
            return import(`../widgets/${widget.type}/${widget.type}.component`);
          })
        );
      })
    );
  }
}
