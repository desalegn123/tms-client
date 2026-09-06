import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseList } from './admin-course-list';

describe('AdminCourseList', () => {
  let component: AdminCourseList;
  let fixture: ComponentFixture<AdminCourseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourseList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
