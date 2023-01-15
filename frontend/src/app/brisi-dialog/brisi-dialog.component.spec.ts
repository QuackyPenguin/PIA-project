import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrisiDialogComponent } from './brisi-dialog.component';

describe('BrisiDialogComponent', () => {
  let component: BrisiDialogComponent;
  let fixture: ComponentFixture<BrisiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrisiDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrisiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
