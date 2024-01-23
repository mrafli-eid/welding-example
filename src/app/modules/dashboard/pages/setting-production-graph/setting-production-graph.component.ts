import { Component } from '@angular/core';
import { MasterParams } from '../../../../core/models/master.model';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MasterDataDeleteComponent } from '../../../master/dialogs/master-data-delete/master-data-delete.component';
// import { ProductionGraphPlan } from '../../../../core/models/shift.model';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DialogAddProductionGraphComponent } from '../../dialogs/dialog-add-production-graph/dialog-add-production-graph.component';
import { DialogEditProductionGraphComponent } from '../../dialogs/dialog-edit-production-graph/dialog-edit-production-graph.component';
import { ProductionGraphPlan } from 'src/app/core/models/production-graph.model';

@Component({
    selector: 'ahm-setting-production-graph',
    templateUrl: './setting-production-graph.component.html',
    styleUrls: ['./setting-production-graph.component.scss'],
})
export class SettingProductionGraphComponent {
    productionGraphList: ProductionGraphPlan[] = [
        {
            id: '2f5d64c2-4e0f-11e9-8646-d663bd873d93',
            plan: 20,
            date_time: '2023-04-09 12:23:15',
            created_at: '2023-04-09 12:23:15',
        },
        {
            id: 'a901d9e9-882b-4b56-96c3-0d736c6eb740',
            plan: 34,
            date_time: '2023-04-09 12:23:15',
            created_at: '2023-04-09 12:23:15',
        },
    ];

    constructor(
        private dashboardService: DashboardService,
        private matDialog: MatDialog
    ) {}

    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    ngOnInit() {
        this.addSearchListener();
        this.fetchList();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.fetchList();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.fetchList();
    }

    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.fetchList();
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.queryParams.search_term = val;
            this.pagination.page_number = 1;
            this.fetchList();
        });
    }

    fetchList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.dashboardService
            .getProductionPlanList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.productionGraphList = response.body.data || [];
                },
            });
    }

    create() {
        const matDialogRef = this.matDialog.open(
            DialogAddProductionGraphComponent
        );

        matDialogRef.afterClosed().subscribe(resp => {
            if (resp) {
                this.pagination.page_number = 1;
                this.fetchList();
            }
        });
    }

    edit(data: ProductionGraphPlan) {
        const matDialogRef = this.matDialog.open(
            DialogEditProductionGraphComponent,
            {
                data,
            }
        );

        matDialogRef.afterClosed().subscribe(resp => {
            if (resp) {
                this.pagination.page_number = 1;
                this.fetchList();
            }
        });
    }

    delete(data: ProductionGraphPlan) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: `Plan ${data.plan}`,
        });

        matDialogRef.afterClosed().subscribe(resp => {
            if (resp) {
                this.dashboardService
                    .deleteProductionPlan(data.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.fetchList();
                    });
            }
        });
    }
}
