import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLobComponent } from './view-lob.component';

describe('ViewLobComponent', () => {
  let component: ViewLobComponent;
  let fixture: ComponentFixture<ViewLobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
