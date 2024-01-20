import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneacionComponent } from './planeacion.component';

describe('PlaneacionComponent', () => {
  let component: PlaneacionComponent;
  let fixture: ComponentFixture<PlaneacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneacionComponent]
    });
    fixture = TestBed.createComponent(PlaneacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
