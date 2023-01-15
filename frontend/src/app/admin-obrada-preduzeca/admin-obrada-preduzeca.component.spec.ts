import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminObradaPreduzecaComponent } from './admin-obrada-preduzeca.component';

describe('AdminObradaPreduzecaComponent', () => {
  let component: AdminObradaPreduzecaComponent;
  let fixture: ComponentFixture<AdminObradaPreduzecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminObradaPreduzecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminObradaPreduzecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
