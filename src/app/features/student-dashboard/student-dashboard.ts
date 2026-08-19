import { Component, signal, computed, inject } from '@angular/core';
import { CourseCard } from '../../ui/course-card/course-card';
import { Course } from '../../models/course.model';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment';
import { CourseStore } from '../../store/course.store';
// The @Component decorator tells Angular: "This class is a visual component."
// It is metadata it describes how this class connects to the HTML template.

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  // imports: [CourseCard],
  imports: [CourseCard], // This tells Angular: "I use CourseCardComponent in my template"
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboard {
  private api = inject(CourseService);
  private enrollmentApi = inject(EnrollmentService);
  private courseStore = inject(CourseStore);
  // signal('Liya Kebede') creates a reactive variable. Angular watchesit.
  // When its value changes, Angular automatically updates the part ofthe screen that displays it.
  studentName = signal('Liya Kebede');
  earnedCredits = signal(45);
  // computed() creates a read-only signal that derives its value fromother signals.
  // It recalculates automatically whenever earnedCredits() changes nomanual refresh.
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress',
  );
  // A regular method. When called, it updates the earnedCredits signal.// The .update() method receives the current value (c) and returnsthe new value (c + 3).
  registerForClass() {
    this.earnedCredits.update((c) => c + 3);
  }
  selectedCourse = signal<Course | null>(null);

  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });
  // A sample course to display (we will switch to an array in Excercise3)

  // handleEnroll(course: Course) {
  //   this.selectedCourse.set(course);
  //   console.log('Enrollment requested for:', course.title);
  // }
  // handleEnroll(course: Course) {
  //   if (course.enrollmentCount < course.maxCapacity) {
  //     course.enrollmentCount++;

  //     this.selectedCourse.set(course);

  //     console.log('Enrollment requested for:', course.title);
  //   }
  // }

  // handleEnroll(course: Course) {
  //   this.enrollmentApi.enroll(1, course.code).subscribe({
  //     next: (result) => {
  //       console.log('Enrollment successful:', result);

  //       this.coursesResource.reload();
  //     },
  //     error: (err) => {
  //       console.error('Enrollment failed:', err);
  //     },
  //   });
  // }

  private testStudentId = 1;

  handleEnroll(course: Course) {
    const studentId = this.testStudentId++;

    this.enrollmentApi.enroll(studentId, course.code).subscribe({
      next: (result) => {
        console.log(`Student ${studentId} enrolled in ${course.code}`, result);

        this.coursesResource.reload();
      },
      error: (err) => {
        console.error(`Student ${studentId} enrollment failed:`, err);
      },
    });
  }
}
