import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from '../../../../core/models/master.model';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MasterDataDeleteComponent } from '../../dialogs/master-data-delete/master-data-delete.component';
import { SubjectMachine } from '../../../../core/models/register.model';
import { DUMMY_REGISTER_SUBJECT_MACHINE_LIST } from './register-subject-machine-list.dummy';
import { RegisterService } from '../../../../core/services/register.service';

@Component({
    selector: 'ahm-register-subject-machine-list',
    templateUrl: './register-subject-machine-list.component.html',
    styleUrls: ['./register-subject-machine-list.component.scss'],
})
export class RegisterSubjectMachineListComponent {
    masterList: SubjectMachine[] = DUMMY_REGISTER_SUBJECT_MACHINE_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<SubjectMachine>();
    @Output() onDetail = new EventEmitter<SubjectMachine>();

    constructor(
        private registerService: RegisterService,
        private matDialog: MatDialog
    ) {}

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
        this.registerService
            .getSubjectMachineList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.masterList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
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

    edit(data: SubjectMachine) {
        this.onEdit.emit(data);
        console.log(data);
    }

    delete(data: SubjectMachine) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: data.machine_name,
        });

        // matDialogRef.afterClosed().subscribe(resp => {
        //     if (resp) {
        //         this.registerService
        //             .deleteSubjectMachine(data.machine_id)
        //             .pipe(take(1))
        //             .subscribe(() => {
        //                 this.pagination.page_number = 1;
        //                 this.getMasterList();
        //             });
        //     }
        // });
    }

    detail(data: SubjectMachine) {
        this.onDetail.emit(data);
    }

    download() {
        this.registerService.exportSubjectMachine();
    }
}
