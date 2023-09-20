import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { MaintenancePreventive } from '../../../../core/models/maintenance-preventive.model';
import { MaintenancePreventiveService } from '../../../../core/services/maintenance-preventive.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'ahm-preventive-maintenance-upsert',
    templateUrl: './preventive-maintenance-upsert.component.html',
    styleUrls: [ './preventive-maintenance-upsert.component.scss' ]
})
export class PreventiveMaintenanceUpsertComponent {
    machineId = '';
    machine_name = '';
    maintenance = 'preventive' || 'corrective';

    @Input() data: MaintenancePreventive;
    @Output() onSubmit = new EventEmitter();
    isOk = false;

    formGroup: FormGroup = new FormGroup({
        name: new FormControl('', [ Validators.required ]),
        plan: new FormControl('', [ Validators.required ]),
        start_date: new FormControl('', [ Validators.required ]),
        machine_id: new FormControl('', [ Validators.required ]),
    });

    constructor(private maintenanceService: MaintenancePreventiveService,
                private activatedRoute: ActivatedRoute,) {
        this.machineId = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.formGroup.patchValue({
            machine_id: this.machineId,
        });
    }


    ngOnChanges() {
        this.formGroup.patchValue(this.data);
        this.isOk = this.data?.ok || false;
        if (this.isOk) {
            this.formGroup.addControl('actual', new FormControl('', [ Validators.required ]));
            // this.formGroup.addControl('end_date', new FormControl([ Validators.required ]));
        } else if (this.data?.actual) {
            this.formGroup.addControl('actual', new FormControl('', [ Validators.required ]));
        }
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            if (body.start_date) {
                body.start_date = moment(body.start_date).format('YYYY-MM-DD');
            }
            // if (body.end_date) {
            //     body.end_date = moment(body.end_date).format('YYYY-MM-DD');
            // }
            if (this.data) {
                if (this.isOk) {
                    this.ok(body);
                } else {
                    this.edit(body);
                }
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

    ok(body: any) {
        const id = this.data.id;
        this.maintenanceService.ok(id, body)
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
