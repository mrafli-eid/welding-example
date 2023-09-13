import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { MaintenanceCorrective } from '../../../../core/models/maintenance-corrective.model';
import { MaintenanceCorrectiveService } from '../../../../core/services/maintenance-corrective.service';
import * as moment from 'moment/moment';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'ahm-corrective-maintenance-upsert',
    templateUrl: './corrective-maintenance-upsert.component.html',
    styleUrls: [ './corrective-maintenance-upsert.component.scss' ]
})
export class CorrectiveMaintenanceUpsertComponent {
    machineId = '';

    @Input() data: MaintenanceCorrective;
    @Output() onSubmit = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        name: new FormControl('', [ Validators.required ]),
        actual: new FormControl('', [ Validators.required ]),
        start_date: new FormControl('', [ Validators.required ]),
        end_date: new FormControl('', [ Validators.required ]),
        machine_id: new FormControl('', [ Validators.required ]),
    });

    constructor(private maintenanceService: MaintenanceCorrectiveService,
                private activatedRoute: ActivatedRoute,
                private dashboardService: DashboardService) {
        this.machineId = this.activatedRoute.snapshot.queryParamMap.get('id');
    }


    ngOnChanges() {
        if (this.data) {
            this.formGroup.addControl('end_date', new FormControl('', [ Validators.required ]));
        }
        this.formGroup.patchValue(this.data);
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;

            if (body.start_date) {
                body.start_date = moment(body.start_date).format('YYYY-MM-DD');
            }

            if (body.end_date) {
                body.end_date = moment(body.end_date).format('YYYY-MM-DD');
            }

            if (this.data) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    edit(body: any) {
        const id = this.data.id;
        this.maintenanceService.update(id, body)
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

    create(body: any) {
        this.maintenanceService.create(body)
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
