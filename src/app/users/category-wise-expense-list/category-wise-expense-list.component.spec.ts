import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseExpenseListComponent } from './category-wise-expense-list.component';

describe('CategoryWiseExpenseListComponent', () => {
  let component: CategoryWiseExpenseListComponent;
  let fixture: ComponentFixture<CategoryWiseExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryWiseExpenseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWiseExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
