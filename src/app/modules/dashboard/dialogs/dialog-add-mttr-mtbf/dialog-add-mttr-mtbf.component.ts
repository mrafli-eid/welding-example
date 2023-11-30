import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toIsoString } from 'src/app/core/helpers/date.helper';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';
import {
    MatDatepicker,
    MatDatepickerModule,
} from '@angular/material/datepicker';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
    parse: {
        dateInput: 'MMMM YYYY',
    },
    display: {
        dateInput: 'MMMM YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'ahm-dialog-add-mttr-mtbf',
    templateUrl: './dialog-add-mttr-mtbf.component.html',
    styleUrls: ['./dialog-add-mttr-mtbf.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class DialogAddMttrMtbfComponent {
    constructor(
        private dashboardService: DashboardService,
        private matDialogRef: MatDialogRef<DialogAddMttrMtbfComponent>
    ) {}

    formGroup: FormGroup = new FormGroup({
        mttr: new FormControl(null, [Validators.required]),
        mtbf: new FormControl(null, [Validators.required]),
    });

    date = new FormControl(moment());

    chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
    }

    chosenMonthHandler(
        normalizedMonth: Moment,
        datepicker: MatDatepicker<Moment>
    ) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normalizedMonth.month());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }

    save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = [];
            body.push({
                mtbf: +this.formGroup.get('mtbf').value,
                mttr: +this.formGroup.get('mttr').value,
                date: this.date.value.format('YYYY-MM-01 00:00:00'),
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
