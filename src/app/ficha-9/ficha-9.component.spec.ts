import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha9Component } from './ficha-9.component';

describe('Ficha9Component', () => {
  let component: Ficha9Component;
  let fixture: ComponentFixture<Ficha9Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha9Component]
    });
    fixture = TestBed.createComponent(Ficha9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
