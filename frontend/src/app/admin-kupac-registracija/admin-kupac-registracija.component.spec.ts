import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKupacRegistracijaComponent } from './admin-kupac-registracija.component';

describe('AdminKupacRegistracijaComponent', () => {
  let component: AdminKupacRegistracijaComponent;
  let fixture: ComponentFixture<AdminKupacRegistracijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKupacRegistracijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKupacRegistracijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
