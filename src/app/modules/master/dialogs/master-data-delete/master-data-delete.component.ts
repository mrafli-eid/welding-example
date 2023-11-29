import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ahm-master-data-delete',
    templateUrl: './master-data-delete.component.html',
    styleUrls: ['./master-data-delete.component.scss'],
})
export class MasterDataDeleteComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public text: string,
        private matDialogRef: MatDialogRef<MasterDataDeleteComponent>
    ) {}

    cancel() {
        this.matDialogRef.close(false);
    }

    delete() {
        this.matDialogRef.close(true);
    }
}
