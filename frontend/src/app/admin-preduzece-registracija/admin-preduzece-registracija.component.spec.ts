import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreduzeceRegistracijaComponent } from './admin-preduzece-registracija.component';

describe('AdminPreduzeceRegistracijaComponent', () => {
  let component: AdminPreduzeceRegistracijaComponent;
  let fixture: ComponentFixture<AdminPreduzeceRegistracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreduzeceRegistracijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreduzeceRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
