import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../core/models/pagination.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ahm-paginator',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
    @Input() pagination: Pagination;
    paginationDisplay = [];

    limitList = [3, 5, 10, 20, 50, 100];
    limit = 3;

    @Output() public selectedPage: EventEmitter<number> = new EventEmitter();
    @Output() public selectedLimit: EventEmitter<number> = new EventEmitter();

    ngOnChanges() {
        this.updatePagination();
    }

    emitDataPage(page: any): void {
        this.selectedPage.emit(page);
        this.updatePagination();
    }

    emitDataLimit(limit: number): void {
        this.limit = limit;
        this.selectedLimit.emit(limit);
        this.updatePagination();
    }

    public updatePagination() {
        this.limit = this.pagination?.page_size || 3;
        if (!this.pagination) {
            this.paginationDisplay = [];
            return;
        }

        this.paginationDisplay = [];
        const totalPage = Number(this.pagination.total_pages || 0);
        const currentPage = Number(this.pagination.page_number || 0);
        if (totalPage <= 5) {
            for (let i = 0; i < totalPage; i++) {
                this.paginationDisplay.push({
                    value: i + 1,
                    text: i + 1,
                });
            }
        } else if (currentPage - 2 <= 1) {
            let x = 0;
            const index = totalPage > 5 ? 5 : totalPage;
            for (let i = 0; i < index; i++) {
                this.paginationDisplay.push({
                    value: i + 1,
                    text: i + 1,
                });
                x = i;
            }
            this.paginationDisplay.push({
                value: x + 1 - 1,
                text: '...',
            });
            this.paginationDisplay.push({
                value: totalPage,
                text: totalPage,
            });
        } else if (currentPage + 2 >= totalPage) {
            this.paginationDisplay.push({
                value: 1,
                text: 1,
            });
            this.paginationDisplay.push({
                value: totalPage - 5,
                text: '...',
            });

            let x = 0;
            for (let i = totalPage - 4; i <= totalPage; i++) {
                this.paginationDisplay.push({
                    value: totalPage - (totalPage - i),
                    text: totalPage - (totalPage - i),
                });
                x = i;
            }
        } else {
            this.paginationDisplay.push({
                value: 1,
                text: 1,
            });
            this.paginationDisplay.push({
                value: currentPage - 3,
                text: '...',
            });
            for (
                let i = Number(currentPage) - 2;
                i <= Number(currentPage) + 2;
                i++
            ) {
                this.paginationDisplay.push({
                    value: i,
                    text: i,
                });
            }
            this.paginationDisplay.push({
                value: currentPage + 3,
                text: '...',
            });
            this.paginationDisplay.push({
                value: totalPage,
                text: totalPage,
            });
        }
    }
}
