import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toIsoString } from '../../../../core/helpers/date.helper';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ahm-dialog-add-production-graph',
    templateUrl: './dialog-add-production-graph.component.html',
    styleUrls: ['./dialog-add-production-graph.component.scss'],
})
export class DialogAddProductionGraphComponent {
    constructor(
        private dashboardService: DashboardService,
        private matDialogRef: MatDialogRef<DialogAddProductionGraphComponent>
    ) {}
    formGroup = new FormGroup({
        plan: new FormControl(null, [Validators.required]),
        date_time: new FormControl(null, [Validators.required]),
    });

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = [];
            const date_time = toIsoString(
                this.formGroup.get('date_time').value
            );
            body.push({
                plan: this.formGroup.get('plan').value,
                date_time,
            });
            console.log("sini");
            console.log(body);
            this.matDialogRef.close(true);
            this.dashboardService
                .createProductionPlan(body)
                .subscribe((resp) => {
                    this.matDialogRef.close(true);
                });
        }
    }

    cancel() {
        this.matDialogRef.close();
    }
}
