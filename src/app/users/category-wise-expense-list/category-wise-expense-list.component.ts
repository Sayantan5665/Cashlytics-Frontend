import { Component, effect, inject, ResourceRef, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { AlertService, ApiService } from '@services';

@Component({
  selector: 'app-category-wise-expense-list',
  imports: [MatSelectModule],
  templateUrl: './category-wise-expense-list.component.html',
  styleUrl: './category-wise-expense-list.component.scss'
})
export class CategoryWiseExpenseListComponent {
  private readonly api = inject(ApiService);
  private readonly alert = inject(AlertService);

  protected readonly months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  protected selectedMonth = signal<{ current: number, selected: number, rangeStart: Date | string, rangeEnd: Date | string }>(
    {
      current: (new Date).getMonth(),
      selected: (new Date).getMonth(),
      rangeStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      rangeEnd: new Date()
    }
  );

  protected categories: ResourceRef<any> = rxResource({
    request: () => ({ selectedMonth: this.selectedMonth() }),
    loader: (e) => {
      const selectedMonth = e.request.selectedMonth;
      return this.api.get(`api/expense/fetch-by-category-wise?type=cash-out&startDate=${selectedMonth.rangeStart}&endDate=${selectedMonth.rangeEnd}`);
    },
  });

  constructor() {
    effect(() => {
      const error = this.categories.error();
      if (error) {
        this.alert.toast("Error fetching categories!", 'error');
      }
      console.log("categories wise expenses: ", this.categories.value());
    });
  }

  protected onMonthChange(event: any) {
    const _selectedMonth = this.selectedMonth();
    if (_selectedMonth.current === event) {
      this.selectedMonth.update((values) => ({ ...values, selected: event, rangeStart: new Date(new Date().getFullYear(), event, 1), rangeEnd: (new Date()) }));
    } else {
      this.selectedMonth.update((values) => ({ ...values, selected: event, rangeStart: new Date(new Date().getFullYear(), event, 1), rangeEnd: new Date((new Date).getFullYear(), event + 1, 0) }));
    }
  }
}
