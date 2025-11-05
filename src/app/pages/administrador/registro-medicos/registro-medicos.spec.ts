import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMedicos } from './registro-medicos';

describe('RegistroMedicos', () => {
  let component: RegistroMedicos;
  let fixture: ComponentFixture<RegistroMedicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMedicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMedicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
