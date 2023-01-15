import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacPregledRacunaComponent } from './kupac-pregled-racuna.component';

describe('KupacPregledRacunaComponent', () => {
  let component: KupacPregledRacunaComponent;
  let fixture: ComponentFixture<KupacPregledRacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupacPregledRacunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacPregledRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
