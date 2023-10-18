import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { MasterSubject } from '../../../../core/models/master.model';
import { MasterSubjectListComponent } from '../master-subject-list/master-subject-list.component';

@Component({
    selector: 'ahm-master-subject-container',
    templateUrl: './master-subject-container.component.html',
    styleUrls: [ './master-subject-container.component.scss' ],
})
export class MasterSubjectContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Data Master', link: '/master' },
        { label: 'Subject', link: '/master/subject' },
    ];
    masterSubject: MasterSubject;
    isDetail = false;

    @ViewChild (MasterSubjectListComponent) listComponent: MasterSubjectListComponent;

    onDetail(masterSubject: MasterSubject) {
        this.masterSubject = masterSubject;
        this.isDetail = true;

    }

    onEdit(masterSubject: MasterSubject) {
        this.masterSubject = masterSubject;
    }

    onFinished() {
        this.masterSubject = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }

}
