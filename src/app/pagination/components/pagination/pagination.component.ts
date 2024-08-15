import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 6;
  @Input() totalPages: number = 1;
  pages: number[] = [];

  @Output() changePage = new EventEmitter<number>();

  onClick(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.changePage.emit(page);
      this.currentPage = page;
    }
  }
  ngOnInit(): void {
    this.updatePages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.updatePages();
    }
  }

  updatePages(): void {
    this.pages = this.range(1, this.totalPages);
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((num) => num + start);
  }
}
