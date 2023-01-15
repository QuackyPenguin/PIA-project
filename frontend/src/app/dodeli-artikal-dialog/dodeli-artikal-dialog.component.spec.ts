import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodeliArtikalDialogComponent } from './dodeli-artikal-dialog.component';

describe('DodeliArtikalDialogComponent', () => {
  let component: DodeliArtikalDialogComponent;
  let fixture: ComponentFixture<DodeliArtikalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodeliArtikalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodeliArtikalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
