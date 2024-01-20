import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincrudsComponent } from './admincruds.component';

describe('AdmincrudsComponent', () => {
  let component: AdmincrudsComponent;
  let fixture: ComponentFixture<AdmincrudsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmincrudsComponent]
    });
    fixture = TestBed.createComponent(AdmincrudsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
