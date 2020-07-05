import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import BarComponent from './widgets/bar/bar.component';
import FunnelComponent from './widgets/funnel/funnel.component';

@NgModule({
  declarations: [DashboardComponent, BarComponent, FunnelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ])
  ]
})
export class DashboardModule {}
