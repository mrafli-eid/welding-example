import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { take } from 'rxjs';
import { Machine } from '../../../core/models/layout-machine.model';
import { DUMMY_MACHINE_LIST } from '../components/layout-machine-area/layout-machine-area.dummy';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    machineList: Machine[] = DUMMY_MACHINE_LIST;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.dashboardService
            .getMachineList()
            .pipe(take(1))
            .subscribe(resp => {
                this.machineList = resp.data;
            });
    }
}
