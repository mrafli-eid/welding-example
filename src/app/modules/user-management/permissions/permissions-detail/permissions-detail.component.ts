import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PermissionListUserManagement } from 'src/app/core/models/user-management';

@Component({
    selector: 'ahm-permissions-detail',
    templateUrl: './permissions-detail.component.html',
    styleUrls: ['./permissions-detail.component.scss'],
})
export class PermissionsDetailComponent {
    @Input() data: PermissionListUserManagement;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
