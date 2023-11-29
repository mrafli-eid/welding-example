import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { MaintenancePreventive } from '../../../../core/models/maintenance-preventive.model';
import { MaintenancePreventiveService } from '../../../../core/services/maintenance-preventive.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ahm-preventive-maintenance-upsert',
    templateUrl: './preventive-maintenance-upsert.component.html',
    styleUrls: ['./preventive-maintenance-upsert.component.scss'],
})
export class PreventiveMaintenanceUpsertComponent {
    machineId = '';
    machine_name = '';
    maintenance = 'preventive' || 'corrective';
    dateTypeList = ['day', 'week', 'month', 'year'];

    @Input() data: MaintenancePreventive;
    @Output() onSubmit = new EventEmitter();
    isOk = false;

    formGroup: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        plan: new FormControl('', [Validators.required]),
        start_date: new FormControl('', [Validators.required]),
        machine_id: new FormControl('', [Validators.required]),
    });

    date_type = new FormControl('');
    custom_range = new FormControl(0);

    queryParams = {
        date_type: '',
        custom_range: 0,
    };

    constructor(
        private maintenanceService: MaintenancePreventiveService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.machineId = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.machine_name = decodeURIComponent(router.url.split('/')[2]);
        this.formGroup.patchValue({
            name: this.machine_name,
            machine_id: this.machineId,
            actual: null,
            end_date: null,
        });
    }

    ngOnChanges() {
        this.formGroup.patchValue(this.data);
        this.isOk = this.data?.ok || false;
        if (this.isOk) {
            this.formGroup.addControl(
                'actual',
                new FormControl('', [Validators.required])
            );
            // this.formGroup.addControl('end_date', new FormControl([ Validators.required ]));
        } else if (this.data?.actual) {
            this.formGroup.addControl(
                'actual',
                new FormControl('', [Validators.required])
            );
        }
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            this.queryParams = {
                date_type: this.date_type.value,
                custom_range: this.custom_range.value,
            };

            if (body.start_date) {
                body.start_date = moment(body.start_date).format('YYYY-MM-DD');
            }
            if (this.data) {
                if (this.isOk) {
                    this.ok(body);
                } else {
                    this.edit(body);
                }
            } else {
                this.create(body, this.queryParams);
                console.log(body, this.queryParams);
            }
        }
    }

    create(body: any, params?: any) {
        this.maintenanceService
            .create(body, params)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.finish();
                },
                error: () => {
                    this.finish();
                },
            });
    }

    edit(body: any) {
        const id = this.data.id;
        this.maintenanceService
            .update(id, body)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.finish();
                },
                error: () => {
                    this.finish();
                },
            });
    }

    ok(body: any) {
        const id = this.data.id;
        this.maintenanceService
            .ok(id, body)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.finish();
                },
                error: () => {
                    this.finish();
                },
            });
    }

    finish() {
        this.onSubmit.emit();
        this.formGroup.reset();
    }
}
