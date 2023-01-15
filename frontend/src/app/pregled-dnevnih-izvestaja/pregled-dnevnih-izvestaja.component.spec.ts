import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledDnevnihIzvestajaComponent } from './pregled-dnevnih-izvestaja.component';

describe('PregledDnevnihIzvestajaComponent', () => {
  let component: PregledDnevnihIzvestajaComponent;
  let fixture: ComponentFixture<PregledDnevnihIzvestajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledDnevnihIzvestajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledDnevnihIzvestajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
