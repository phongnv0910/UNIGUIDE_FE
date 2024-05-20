import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViproComponent } from './form-vipro.component';

describe('FormViproComponent', () => {
  let component: FormViproComponent;
  let fixture: ComponentFixture<FormViproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormViproComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
