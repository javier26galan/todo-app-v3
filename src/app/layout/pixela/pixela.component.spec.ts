import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelaComponent } from './pixela.component';

describe('PixelaComponent', () => {
  let component: PixelaComponent;
  let fixture: ComponentFixture<PixelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PixelaComponent]
    });
    fixture = TestBed.createComponent(PixelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
