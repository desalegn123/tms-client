import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/course-detail/course-detail').then((m) => m.CourseDetail),
  },

  {
    path: 'enroll',
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form').then((m) => m.EnrollmentForm),
  },
  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list').then((m) => m.EnrollmentList),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard').then((m) => m.StudentDashboard),
  },
  {
    path: 'instructor-dashboard',

    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard').then(
        (m) => m.InstructorDashboard,
      ),
  },
  {
    path: 'grade-submission',
    loadComponent: () =>
      import('./features/grade-submission/grade-submission.component').then(
        (m) => m.GradeSubmissionComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
