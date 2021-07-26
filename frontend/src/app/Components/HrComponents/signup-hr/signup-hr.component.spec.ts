import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupHrComponent } from './signup-hr.component';

describe('SignupHrComponent', () => {
  let component: SignupHrComponent;
  let fixture: ComponentFixture<SignupHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
