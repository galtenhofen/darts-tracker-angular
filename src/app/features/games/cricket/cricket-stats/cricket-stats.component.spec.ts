import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketStatsComponent } from './cricket-stats.component';

describe('CricketStatsComponent', () => {
  let component: CricketStatsComponent;
  let fixture: ComponentFixture<CricketStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CricketStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CricketStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
