import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketButtonsComponent } from './cricket-buttons.component';

describe('CricketButtonsComponent', () => {
  let component: CricketButtonsComponent;
  let fixture: ComponentFixture<CricketButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CricketButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CricketButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
