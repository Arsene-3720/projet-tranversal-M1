import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenDetailComponent } from './citoyen-detail.component';

describe('CitoyenDetailComponent', () => {
  let component: CitoyenDetailComponent;
  let fixture: ComponentFixture<CitoyenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitoyenDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitoyenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
