import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaComponent } from './view-ta.component';

describe('ViewTaComponent', () => {
  let component: ViewTaComponent;
  let fixture: ComponentFixture<ViewTaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
