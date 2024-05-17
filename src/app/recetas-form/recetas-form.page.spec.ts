import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetasFormPage } from './recetas-form.page';

describe('RecetasFormPage', () => {
  let component: RecetasFormPage;
  let fixture: ComponentFixture<RecetasFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
