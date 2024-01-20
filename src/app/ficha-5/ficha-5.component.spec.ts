import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ficha5Component } from './ficha-5.component';

describe('Ficha5Component', () => {
  let component: Ficha5Component;
  let fixture: ComponentFixture<Ficha5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ficha5Component]
    });
    fixture = TestBed.createComponent(Ficha5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
