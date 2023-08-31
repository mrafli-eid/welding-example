import { Component, Inject } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toIsoString } from '../../../../core/helpers/date.helper';
import * as moment from 'moment';
import { ProductionGraphPlan } from 'src/app/core/models/production-graph.model';

@Component({
    selector: 'ahm-dialog-edit-production-graph',
    templateUrl: './dialog-edit-production-graph.component.html',
    styleUrls: ['./dialog-edit-production-graph.component.scss'],
})
export class DialogEditProductionGraphComponent {
    formGroup = new FormGroup({
        plan: new FormControl(null, [Validators.required]),
        date_time: new FormControl(null, [Validators.required]),
    });

    constructor(
        private dashboardService: DashboardService,
        private matDialogRef: MatDialogRef<DialogEditProductionGraphComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ProductionGraphPlan
    ) {
        this.formGroup.patchValue({
            plan: data.plan,
            date_time: moment(data.date_time, 'DD-MM-YYYY hh:mm:ss').toDate(),
        });
    }

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = {
                plan: +this.formGroup.get('plan').value,
                date_time: toIsoString(this.formGroup.get('date_time').value),
            };
            this.dashboardService
                .updateProductionPlan(this.data.id, body)
                .subscribe((resp) => {
                    this.matDialogRef.close(true);
                });
        }
    }

    cancel() {
        this.matDialogRef.close();
    }
}
