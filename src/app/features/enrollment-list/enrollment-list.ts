import { Component, viewChild, effect, inject } from '@angular/core';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

import { MatSortModule, MatSort } from '@angular/material/sort';

import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';
import { DashboardSummary } from '../dashboard-summary/dashboard-summary';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DashboardSummary],
  templateUrl: './enrollment-list.html',
  styleUrl: './enrollment-list.scss',
})
export class EnrollmentList {
  store = inject(EnrollmentStore);

  displayedColumns = ['studentName', 'courseName', 'status', 'actions'];

  dataSource = new MatTableDataSource<Enrollment>();

  readonly paginator = viewChild.required(MatPaginator);

  readonly sort = viewChild.required(MatSort);

  constructor() {
    effect(() => {
      this.dataSource.data = this.store.entities();
    });

    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });

    this.store.loadEnrollments();
    this.store.listenForLiveUpdates();
  }
}
