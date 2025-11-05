import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapasPage } from './mapas.page';

describe('MapasPage', () => {
  let component: MapasPage;
  let fixture: ComponentFixture<MapasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
