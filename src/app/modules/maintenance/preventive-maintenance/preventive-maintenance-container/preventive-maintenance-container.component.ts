import { Component, ViewChild } from '@angular/core';
import { MaintenancePage } from '../../../../core/consts/maintenance.const';
import { MaintenancePreventive } from '../../../../core/models/maintenance-preventive.model';
import {
    PreventiveMaintenanceListComponent
} from '../preventive-maintenance-list/preventive-maintenance-list.component';

@Component({
    selector: 'ahm-preventive-maintenance-container',
    templateUrl: './preventive-maintenance-container.component.html',
    styleUrls: [ './preventive-maintenance-container.component.scss' ]
})
export class PreventiveMaintenanceContainerComponent {
    page = MaintenancePage.LIST;
    MaintenancePage = MaintenancePage;

    data: MaintenancePreventive = null;

    @ViewChild(PreventiveMaintenanceListComponent) listComponent: PreventiveMaintenanceListComponent;

    openUpsert(data: MaintenancePreventive) {
        this.data = data;
        this.page = MaintenancePage.UPSERT;
    }

    openDetail(data: MaintenancePreventive) {
        this.data = data;
        this.page = MaintenancePage.DETAIL;
    }

    openList() {
        this.page = MaintenancePage.LIST;
        this.listComponent.refreshData();
    }

}
