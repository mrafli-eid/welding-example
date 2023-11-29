import { Component, ViewChild } from '@angular/core';
import { MaintenancePage } from 'src/app/core/consts/maintenance.const';
import { MaintenanceCorrective } from '../../../../core/models/maintenance-corrective.model';
import { CorrectiveMaintenanceListComponent } from '../corrective-maintenance-list/corrective-maintenance-list.component';

@Component({
    selector: 'ahm-corrective-maintenance-container',
    templateUrl: './corrective-maintenance-container.component.html',
    styleUrls: ['./corrective-maintenance-container.component.scss'],
})
export class CorrectiveMaintenanceContainerComponent {
    page = MaintenancePage.LIST;
    MaintenancePage = MaintenancePage;

    data: MaintenanceCorrective = null;

    @ViewChild(CorrectiveMaintenanceListComponent)
    listComponent: CorrectiveMaintenanceListComponent;

    openUpsert(data: MaintenanceCorrective) {
        this.data = data;
        this.page = MaintenancePage.UPSERT;
    }

    openDetail(data: MaintenanceCorrective) {
        this.data = data;
        this.page = MaintenancePage.DETAIL;
    }

    openList() {
        this.page = MaintenancePage.LIST;
        this.listComponent.refreshData();
    }
}
