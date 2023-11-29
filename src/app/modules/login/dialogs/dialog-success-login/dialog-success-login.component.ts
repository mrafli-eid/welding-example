import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogErrorLoginComponent } from '../dialog-error-login/dialog-error-login.component';

@Component({
    selector: 'ahm-dialog-success-login',
    templateUrl: './dialog-success-login.component.html',
    styleUrls: ['./dialog-success-login.component.scss'],
})
export class DialogSuccessLoginComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public text: string,
        private matDialogRef: MatDialogRef<DialogErrorLoginComponent>
    ) {}
}
