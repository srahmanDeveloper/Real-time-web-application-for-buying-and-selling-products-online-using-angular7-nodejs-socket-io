import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { eShopHomeComponent } from './eShophome.component';

describe('eShopHomeComponent', () => {
  let component: eShopHomeComponent;
  let fixture: ComponentFixture<eShopHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ eShopHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(eShopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
