import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { MasterLine } from '../../../../core/models/master.model';

@Component({
    selector: 'ahm-master-line-container',
    templateUrl: './master-line-container.component.html',
    styleUrls: [ './master-line-container.component.scss' ],
})
export class MasterLineContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Data Master', link: '/master' },
        { label: 'Line', link: '/master/line' },
    ];
    masterLine: MasterLine;
    isDetail = false;

    onDetail(masterLine: MasterLine) {
        this.masterLine = masterLine;
        this.isDetail = true;

    }

    onEdit(masterLine: MasterLine) {
        this.masterLine = masterLine;
    }

    onFinished() {
        this.masterLine = null;
        this.isDetail = false;
    }

}
