import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent implements OnInit {

  @Output() selectedDates = new EventEmitter<{ from: Date, to: Date }>();
  @Input() from: Date | string | null = null;
  @Input() to: Date | string | null = null;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  today = new Date();
  startDay:NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());

  constructor() {

  }
  ngOnInit() {
    if (this.from) {
      const fromDate = this.from instanceof Date ? this.from : new Date(this.from);
      this.fromDate = new NgbDate(fromDate.getFullYear(), fromDate.getMonth() + 1, fromDate.getDate());
      this.startDay = this.fromDate;
    }

    if (this.to) {
      const toDate = this.to instanceof Date ? this.to : new Date(this.to);
      this.toDate = new NgbDate(toDate.getFullYear(), toDate.getMonth() + 1, toDate.getDate());
    }
  }

  onDateSelection(date: NgbDate) {
    if (this.fromDate) {

      if (this.toDate || date.before(this.fromDate)) {

        this.toDate = null;
        this.fromDate = date;

      } else if (date.after(this.fromDate) || date.equals(this.fromDate)) {

        this.toDate = date;

        const from = new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day);

        const to = new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day);

        this.selectedDates.emit({ from: from, to: to });

      }

    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
