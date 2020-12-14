import { TestBed } from '@angular/core/testing';

import { HttpErrorMessageService } from './http-error-message.service';

describe('HttpErrorMessageService', () => {
  let service: HttpErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
