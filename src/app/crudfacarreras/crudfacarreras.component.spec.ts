import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudfacarrerasComponent } from './crudfacarreras.component';

describe('CrudfacarrerasComponent', () => {
  let component: CrudfacarrerasComponent;
  let fixture: ComponentFixture<CrudfacarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudfacarrerasComponent]
    });
    fixture = TestBed.createComponent(CrudfacarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
