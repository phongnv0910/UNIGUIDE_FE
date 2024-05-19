import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalFormComponent } from './normal-form.component';

describe('NormalFormComponent', () => {
  let component: NormalFormComponent;
  let fixture: ComponentFixture<NormalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
