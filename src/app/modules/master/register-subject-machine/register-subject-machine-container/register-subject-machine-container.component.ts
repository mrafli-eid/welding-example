import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { SubjectMachine } from '../../../../core/models/register.model';
import { RegisterSubjectMachineListComponent } from '../register-subject-machine-list/register-subject-machine-list.component';

@Component({
    selector: 'ahm-register-subject-machine-container',
    templateUrl: './register-subject-machine-container.component.html',
    styleUrls: ['./register-subject-machine-container.component.scss'],
})
export class RegisterSubjectMachineContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Register', link: '/master' },
        { label: 'Machine Subject', link: '/master/register/subject-machine' },
    ];
    data: SubjectMachine;
    isDetail = false;

    @ViewChild(RegisterSubjectMachineListComponent)
    listComponent: RegisterSubjectMachineListComponent;

    onDetail(data: SubjectMachine) {
        this.data = data;
        this.isDetail = true;
    }

    onEdit(data: SubjectMachine) {
        this.data = data;
    }

    onFinished() {
        this.data = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }
}
