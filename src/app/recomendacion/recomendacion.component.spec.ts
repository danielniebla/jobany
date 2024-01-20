import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionComponent } from './recomendacion.component';

describe('RecomendacionComponent', () => {
  let component: RecomendacionComponent;
  let fixture: ComponentFixture<RecomendacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendacionComponent]
    });
    fixture = TestBed.createComponent(RecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
