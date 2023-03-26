import { TestBed } from '@angular/core/testing';

import { SearchMsuService } from './search-msu.service';

describe('SearchMsuService', () => {
  let service: SearchMsuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMsuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
