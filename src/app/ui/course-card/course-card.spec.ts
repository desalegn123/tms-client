import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [provideRouter([])],
    }).compileComponents();

    // fixture = TestBed.createComponent(CourseCard);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('course', {
      id: 1,
      code: 'CS101',
      title: 'Angular Fundamentals',
      maxCapacity: 30,
      enrollmentCount: 12,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
