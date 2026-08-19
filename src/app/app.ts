// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// // import { DashboardSummary } from './features/dashboard-summary/dashboard-summary';
// import { EnrollmentList } from './features/enrollment-list/enrollment-list';
// import { DashboardSummary } from './features/dashboard-summary/dashboard-summary';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {
//   protected readonly title = signal('tms-client');
// }
// import { Component, signal } from '@angular/core';
// import { RouterOutlet, RouterModule } from '@angular/router';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule],
//   templateUrl: './app.html',
//   styleUrls: ['./app.scss'],
// })
// export class App {
//   protected readonly title = signal('tms-client');
// }

import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { EnrollmentStore } from './store/enrollment.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('tms-client');

  private store = inject(EnrollmentStore);

  ngOnInit(): void {
    this.store.loadEnrollments();
    this.store.listenForLiveUpdates();
  }
}
