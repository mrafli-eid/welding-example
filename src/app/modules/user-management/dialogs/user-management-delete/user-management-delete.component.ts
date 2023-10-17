import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ahm-user-management-delete',
  templateUrl: './user-management-delete.component.html',
  styleUrls: ['./user-management-delete.component.scss']
})
export class UserManagementDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public text: string,
                private matDialogRef: MatDialogRef<UserManagementDeleteComponent>) {
    }

    cancel() {
        this.matDialogRef.close(false);
    }

    delete() {
        this.matDialogRef.close(true);
    }
}
