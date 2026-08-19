import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
// import { StudentDashboard } from './student-dashboard';
import { StudentDashboard } from './student-dashboard';

describe('StudentDashboard', () => {
  let component: StudentDashboard;
  let fixture: ComponentFixture<StudentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
