import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toIsoString } from '../../../../core/helpers/date.helper';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
    MatDatepicker,
    MatDatepickerModule,
} from '@angular/material/datepicker';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as moment from 'moment';

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
        plan: new FormControl('1500', [Validators.required]),
        start_date: new FormControl(null, [Validators.required]),
        end_date: new FormControl(null),
    });

    dateFilter: DateFilter = getDefaultDateFilter();

    queryParams = {
        range: 7,
    };

    // Check if both start_date and end_date are available

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid || (this.formGroup.get('start_date').value && this.formGroup.get('plan').value)) {
            const body = [];
            const start_date = toIsoString(this.formGroup.get('start_date').value);
            const end_date = toIsoString(this.formGroup.get('end_date')?.value);
            body.push({
                plan: +this.formGroup.get('plan').value,
                date_time: start_date,
            });

            // Calculate the date range in days
            const range_total = moment(end_date).diff(moment(start_date), 'days') + 1;

            this.queryParams = {
                range: range_total,
            };
            
            
            console.log(body[0], this.queryParams);
            this.matDialogRef.close(true);
            this.dashboardService
                .createProductionPlan(body[0], this.queryParams)
                .subscribe(resp => {
                    this.matDialogRef.close(true);
                });
        }
    }

    cancel() {
        this.matDialogRef.close();
    }
}
