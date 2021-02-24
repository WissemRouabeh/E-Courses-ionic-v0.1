import { TestBed } from '@angular/core/testing';

import { CoursesrvService } from './coursesrv.service';

describe('CoursesrvService', () => {
  let service: CoursesrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
