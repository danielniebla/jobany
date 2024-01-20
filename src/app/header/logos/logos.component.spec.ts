import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogosComponent } from './logos.component';

describe('LogosComponent', () => {
  let component: LogosComponent;
  let fixture: ComponentFixture<LogosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogosComponent]
    });
    fixture = TestBed.createComponent(LogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
