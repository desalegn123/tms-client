import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSummary } from './dashboard-summary';

describe('DashboardSummary', () => {
  let component: DashboardSummary;
  let fixture: ComponentFixture<DashboardSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
