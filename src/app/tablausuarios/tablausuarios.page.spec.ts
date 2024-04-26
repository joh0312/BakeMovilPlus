import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablausuariosPage } from './tablausuarios.page';

describe('TablausuariosPage', () => {
  let component: TablausuariosPage;
  let fixture: ComponentFixture<TablausuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TablausuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
