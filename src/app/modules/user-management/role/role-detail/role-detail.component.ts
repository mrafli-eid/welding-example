import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleListUserManagement } from 'src/app/core/models/user-management';

@Component({
  selector: 'ahm-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent {
    @Input() roleManagement: RoleListUserManagement;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }
}
