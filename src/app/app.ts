import { Component } from '@angular/core';
import { StudentDashboardComponent } from './features/student-dashboard/student-dashboard.component';
import { EnrollmentForm } from "./features/enrollment-form/enrollment-form";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentDashboardComponent, EnrollmentForm, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}