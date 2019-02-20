import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixitPage } from './fixit.page';

describe('FixitPage', () => {
  let component: FixitPage;
  let fixture: ComponentFixture<FixitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
