import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ahm-pagination',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './pagination.component.html',
    styleUrls: [ './pagination.component.scss' ],
})
export class PaginationComponent implements OnChanges {
    pageList: number[] = [];
    @Input() totalPage = 5;
    @Input() page = 0;
    @Output() onPageChange = new EventEmitter<number>();

    ngOnChanges() {
        this.generatePages();
    }

    generatePages() {
        this.pageList = [ ...Array(this.totalPage).keys() ];
    }

    selectPage(index: number): void {
        this.page = index;
        this.onPageChange.emit(this.page);
    }
}
