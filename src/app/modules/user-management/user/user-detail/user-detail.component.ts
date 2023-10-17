import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserListUserManagement } from 'src/app/core/models/user-management';

@Component({
  selector: 'ahm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    @Input() userManagement: UserListUserManagement;
    @Output() onFinished = new EventEmitter();

    back() {
        this.onFinished.emit();
    }

}
