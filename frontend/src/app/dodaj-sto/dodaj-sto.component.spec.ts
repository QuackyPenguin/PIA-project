import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajStoComponent } from './dodaj-sto.component';

describe('DodajStoComponent', () => {
  let component: DodajStoComponent;
  let fixture: ComponentFixture<DodajStoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajStoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajStoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
