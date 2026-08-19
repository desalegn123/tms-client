import { Component, input, output } from '@angular/core';
import { Course } from '../../models/course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tms-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  course = input.required<Course>();
  enrollClicked = output<Course>();
  deleteClicked = output<Course>();
}
