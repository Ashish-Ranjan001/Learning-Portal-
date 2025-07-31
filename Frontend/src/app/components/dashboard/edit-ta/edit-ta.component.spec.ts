import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaComponent } from './edit-ta.component';

describe('EditTaComponent', () => {
  let component: EditTaComponent;
  let fixture: ComponentFixture<EditTaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
