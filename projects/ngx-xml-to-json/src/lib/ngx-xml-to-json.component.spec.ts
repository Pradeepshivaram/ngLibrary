import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxXmlToJsonComponent } from './ngx-xml-to-json.component';

describe('NgxXmlToJsonComponent', () => {
  let component: NgxXmlToJsonComponent;
  let fixture: ComponentFixture<NgxXmlToJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxXmlToJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxXmlToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
