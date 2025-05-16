import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLobComponent } from './edit-lob.component';

describe('EditLobComponent', () => {
  let component: EditLobComponent;
  let fixture: ComponentFixture<EditLobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
