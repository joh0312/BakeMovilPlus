import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcasFormPage } from './marcas-form.page';

describe('MarcasFormPage', () => {
  let component: MarcasFormPage;
  let fixture: ComponentFixture<MarcasFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
