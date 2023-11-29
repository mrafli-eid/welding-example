import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ahm-dialog-error-login',
    templateUrl: './dialog-error-login.component.html',
    styleUrls: ['./dialog-error-login.component.scss'],
})
export class DialogErrorLoginComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public text: string,
        private matDialogRef: MatDialogRef<DialogErrorLoginComponent>
    ) {}

    tryAgain() {
        this.matDialogRef.close(true);
    }
}
