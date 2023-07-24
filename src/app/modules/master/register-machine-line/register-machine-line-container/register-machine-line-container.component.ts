import { Component } from '@angular/core';
import { Breadcrumb } from "../../../../core/models/breadcrumbs.model";
import { MachineLine } from "../../../../core/models/register.model";

@Component({
    selector: 'ahm-register-machine-line-container',
    templateUrl: './register-machine-line-container.component.html',
    styleUrls: [ './register-machine-line-container.component.scss' ]
})
export class RegisterMachineLineContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Register', link: '/master' },
        { label: 'Register Line Machine', link: '/master/register/machine-line' },
    ];
    data: MachineLine;
    isDetail = false;

    onDetail(data: MachineLine) {
        this.data = data;
        this.isDetail = true;

    }

    onEdit(data: MachineLine) {
        this.data = data;
    }

    onFinished() {
        this.data = null;
        this.isDetail = false;
    }
}
