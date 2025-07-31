import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSmeComponent } from './view-sme.component';

describe('ViewSmeComponent', () => {
  let component: ViewSmeComponent;
  let fixture: ComponentFixture<ViewSmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
