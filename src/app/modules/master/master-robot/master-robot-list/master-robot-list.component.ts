import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams, MasterRobot } from "../../../../core/models/master.model";
import { Pagination } from "../../../../core/models/pagination.model";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { debounceTime, take } from "rxjs";
import { Sort } from "@angular/material/sort";
import { MasterDataDeleteComponent } from "../../dialogs/master-data-delete/master-data-delete.component";
import { DUMMY_ROBOT_MACHINE_LIST } from "./master-robot-list.dummy";
import { MasterService } from "../../../../core/services/master.service";

@Component({
  selector: 'app-master-robot-list',
  templateUrl: './master-robot-list.component.html',
  styleUrls: ['./master-robot-list.component.scss']
})

export class MasterRobotListComponent {
    masterList: MasterRobot[] = DUMMY_ROBOT_MACHINE_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<MasterRobot>();
    @Output() onDetail = new EventEmitter<MasterRobot>();

    constructor(private masterService: MasterService,
                private matDialog: MatDialog) {
    }

    ngOnInit() {
        this.addSearchListener();
        this.getMasterList();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getMasterList();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getMasterList();
    }

    refreshData() {
        this.pagination.page_number = 1;
        this.getMasterList();
    }

    getMasterList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.masterService.getLineList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.pagination = JSON.parse(response.headers.get('x-pagination'));
                    this.masterList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.pagination.page_number = 1;
                this.getMasterList();
            });
    }


    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getMasterList();
    }

    edit(masterLine: MasterRobot) {
        this.onEdit.emit(masterLine);
    }

    delete(masterLine: MasterRobot) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: masterLine.name,
        });

        matDialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.masterService.deleteLine(masterLine.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.getMasterList();
                    });
            }
        });
    }

    detail(masterLine: MasterRobot) {
        this.onDetail.emit(masterLine);
    }

    download() {
        this.masterService.exportExcelLine();
    }
}
