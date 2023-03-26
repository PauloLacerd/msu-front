import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMsuComponent } from './search-msu.component';

describe('SearchMsuComponent', () => {
  let component: SearchMsuComponent;
  let fixture: ComponentFixture<SearchMsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
