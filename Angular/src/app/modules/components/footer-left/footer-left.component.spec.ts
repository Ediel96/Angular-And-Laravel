import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLeftComponent } from './footer-left.component';

describe('FooterLeftComponent', () => {
  let component: FooterLeftComponent;
  let fixture: ComponentFixture<FooterLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
