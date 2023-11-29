import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toIsoString } from 'src/app/core/helpers/date.helper';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ahm-dialog-add-mttr-mtbf',
    templateUrl: './dialog-add-mttr-mtbf.component.html',
    styleUrls: ['./dialog-add-mttr-mtbf.component.scss'],
})
export class DialogAddMttrMtbfComponent {
    constructor(
        private dashboardService: DashboardService,
        private matDialogRef: MatDialogRef<DialogAddMttrMtbfComponent>
    ) {}

    formGroup: FormGroup = new FormGroup({
        mttr: new FormControl(null, [Validators.required]),
        mtbf: new FormControl(null, [Validators.required]),
        date: new FormControl(null, [Validators.required]),
    });

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = [];
            const date = toIsoString(this.formGroup.get('date').value);
            body.push({
                mtbf: +this.formGroup.get('mtbf').value,
                mttr: +this.formGroup.get('mttr').value,
                date,
            });
            console.log(body[0]);
            this.matDialogRef.close(true);
            this.dashboardService
                .createSettingMttrMtbf(body[0])
                .subscribe(() => {
                    this.matDialogRef.close(true);
                });
        }
    }

    cancel() {
        this.matDialogRef.close();
    }
}
