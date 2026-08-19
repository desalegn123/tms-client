import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsChart } from './analytics-chart';

describe('AnalyticsChart', () => {
  let component: AnalyticsChart;
  let fixture: ComponentFixture<AnalyticsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsChart],
    }).compileComponents();

    // fixture = TestBed.createComponent(AnalyticsChart);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    fixture = TestBed.createComponent(AnalyticsChart);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('data', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
