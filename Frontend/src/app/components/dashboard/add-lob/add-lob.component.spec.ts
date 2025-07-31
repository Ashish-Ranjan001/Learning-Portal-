import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLobComponent } from './add-lob.component';

describe('AddLobComponent', () => {
  let component: AddLobComponent;
  let fixture: ComponentFixture<AddLobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
