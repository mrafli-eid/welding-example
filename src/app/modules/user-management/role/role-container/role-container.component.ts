import { Component } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs.model';
import { RoleListUserManagement } from 'src/app/core/models/user-management';

@Component({
  selector: 'ahm-role-container',
  templateUrl: './role-container.component.html',
  styleUrls: ['./role-container.component.scss']
})
export class RoleContainerComponent {
  breadcrumbs: Breadcrumb[] = [
    { label: 'User Management', link: '/user-management' },
    { label: 'Role', link: '/user-management/role' },
  ];

  roleManagement: RoleListUserManagement;
  isDetail = false;

  onDetail(roleManagement: RoleListUserManagement) {
    this.roleManagement = roleManagement;
    this.isDetail = true;
  }

  onEdit(roleManagement: RoleListUserManagement) {
      this.roleManagement = roleManagement;
  }

  onFinished() {
      this.roleManagement = null;
      this.isDetail = false;
  }

}
