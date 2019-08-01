import { TestBed } from '@angular/core/testing';

import { NgxXmlToJsonService } from './ngx-xml-to-json.service';

describe('NgxXmlToJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxXmlToJsonService = TestBed.get(NgxXmlToJsonService);
    expect(service).toBeTruthy();
  });
});
