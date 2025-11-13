import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisFormulasComponent } from './mis-formulas';

describe('MisFormulas', () => {
  let component: MisFormulasComponent;
  let fixture: ComponentFixture<MisFormulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisFormulasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
