import { Component, viewChild, effect, inject } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';
@Component({
selector: 'tms-enrollment-list',
standalone: true,
imports: [MatTableModule, MatPaginatorModule, MatSortModule],
templateUrl: './enrollment-list.html',
styleUrl: './enrollment-list.scss'//check at the last pages
// of this file
})
export class EnrollmentListComponent {
store = inject(EnrollmentStore);
displayedColumns = ['studentName', 'courseName', 'status', 'actions'];
// MatTableDataSource bridges our store data into Material's rendering pipeline
dataSource = new MatTableDataSource<Enrollment>();
// viewChild.required() is Angular 22's signal-based replacement for @ViewChild.
// Unlike the legacy decorator, these are signals — they update reactively when
// Angular resolves the template queries. No ngAfterViewInit lifecycle hook needed.
readonly paginator = viewChild.required(MatPaginator);
readonly sort = viewChild.required(MatSort);
constructor() {
// Effect 1: Push store entities into the Material data source whenever they change.
// Every time the store updates (approve, load, rollback), this effect fires
// and the table re-renders with fresh data.
effect(() => {
this.dataSource.data = this.store.entities();
});
// Effect 2: Wire paginator and sort controls once Angular resolvesthe view queries.
// Because viewChild returns a signal, this effect re-runs when thepaginator
// or sort directives become available — no manual lifecycle hook needed.
effect(() => {
this.dataSource.paginator = this.paginator();
this.dataSource.sort = this.sort();
});
// Load enrollments on component creation
this.store.loadEnrollments();
}
}