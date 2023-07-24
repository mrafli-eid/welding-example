import { Component } from '@angular/core';
import { Breadcrumb } from "../../../../core/models/breadcrumbs.model";
import { SubjectMachine } from "../../../../core/models/register.model";

@Component({
    selector: 'ahm-register-subject-machine-container',
    templateUrl: './register-subject-machine-container.component.html',
    styleUrls: [ './register-subject-machine-container.component.scss' ]
})
export class RegisterSubjectMachineContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Register', link: '/master' },
        { label: 'Machine Subject', link: '/master/register/subject-machine' },
    ];
    data: SubjectMachine;
    isDetail = false;

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
    }

}
