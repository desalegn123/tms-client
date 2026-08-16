import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "courses/:id",
    loadComponent: () =>
      import("./features/course-detail/course-detail").then(
        (m) => m.CourseDetail
      ),
  },
  {
    path: "enroll",
    loadComponent: () =>
      import("./features/enrollment-form/enrollment-form").then(
        (m) => m.EnrollmentForm
      ),
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./features/instructor-dashboard/instructor-dashboard").then(
        (m) => m.InstructorDashboardComponent
      ),
  },
  {
    path: "enrollments",
    loadComponent: () =>
      import("./features/enrollment-list/enrollment-list").then(
        (m) => m.EnrollmentListComponent
      ),
  },
  {
path: 'grade-submission',
loadComponent: () =>
import('./features/grade-submission/grade-submission.component')
.then(m => m.GradeSubmissionComponent)
},
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];