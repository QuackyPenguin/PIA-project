import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodaciOPreduzecuComponent } from './podaci-o-preduzecu.component';

describe('PodaciOPreduzecuComponent', () => {
  let component: PodaciOPreduzecuComponent;
  let fixture: ComponentFixture<PodaciOPreduzecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodaciOPreduzecuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodaciOPreduzecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
