import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { MasterMachine } from '../../../../core/models/master.model';
import { MasterMachineListComponent } from '../master-machine-list/master-machine-list.component';

@Component({
    selector: 'ahm-master-machine-container',
    templateUrl: './master-data-machine.component.html',
    styleUrls: [ './master-data-machine.component.scss' ],
})
export class MasterDataMachineComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Data Master', link: '/master' },
        { label: 'Machine', link: '/master/machine' },
    ];
    masterMachine: MasterMachine;
    isDetail = false;

    @ViewChild (MasterMachineListComponent) listComponent: MasterMachineListComponent;

    onDetail(masterMachine: MasterMachine) {
        this.masterMachine = masterMachine;
        this.isDetail = true;
    }

    onEdit(masterMachine: MasterMachine) {
        this.masterMachine = masterMachine;
    }

    onFinished() {
        this.masterMachine = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }

}
