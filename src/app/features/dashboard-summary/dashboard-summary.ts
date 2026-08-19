import { Component, inject } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  templateUrl: './dashboard-summary.html',
})
export class DashboardSummary {
  store = inject(EnrollmentStore);
}
