import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzecePrviPutComponent } from './preduzece-prvi-put.component';

describe('PreduzecePrviPutComponent', () => {
  let component: PreduzecePrviPutComponent;
  let fixture: ComponentFixture<PreduzecePrviPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreduzecePrviPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreduzecePrviPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
