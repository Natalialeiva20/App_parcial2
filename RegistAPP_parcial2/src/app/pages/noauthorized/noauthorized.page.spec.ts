import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoauthorizedPage } from './noauthorized.page';

describe('NoauthorizedPage', () => {
  let component: NoauthorizedPage;
  let fixture: ComponentFixture<NoauthorizedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoauthorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
