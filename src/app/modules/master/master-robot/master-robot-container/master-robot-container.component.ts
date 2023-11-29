import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { MasterRobot } from '../../../../core/models/master.model';
import { MasterRobotListComponent } from '../master-robot-list/master-robot-list.component';

@Component({
    selector: 'app-master-robot-container',
    templateUrl: './master-robot-container.component.html',
    styleUrls: ['./master-robot-container.component.scss'],
})
export class MasterRobotContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Data Master', link: '/master' },
        { label: 'Robot', link: '/master/robot' },
    ];

    masterRobot: MasterRobot;
    isDetail = false;

    @ViewChild(MasterRobotListComponent)
    listComponent: MasterRobotListComponent;

    onDetail(masterRobot: MasterRobot) {
        this.masterRobot = masterRobot;
        this.isDetail = true;
    }

    onEdit(masterRobot: MasterRobot) {
        this.masterRobot = masterRobot;
    }

    onFinished() {
        this.masterRobot = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }
}
