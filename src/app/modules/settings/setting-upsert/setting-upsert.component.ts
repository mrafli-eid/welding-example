import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
    registerMachine,
    MasterParams,
    MasterSubject,
} from '../../../core/models/master.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { DUMMY_MASTER_SUBJECT_LIST } from '../../master/master-subject/master-subject-list/master-subject-list.dummy';
import { DUMMY_MASTER_MACHINE_LIST } from '../../master/master-machine/master-machine-list/master-machine-list.dummy';
import { SettingService } from '../../../core/services/setting.service';
import { Setting } from 'src/app/core/models/setting.model';
import { DUMMY_SETTING_LIST } from '../setting-list/setting-list.dummy';
import { Pagination } from 'src/app/core/models/pagination.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ahm-setting-upsert',
    templateUrl: './setting-upsert.component.html',
    styleUrls: ['./setting-upsert.component.scss'],
})
export class SettingUpsertComponent implements OnInit {
    @Input() setting: Setting[];
    @Output() onSubmit = new EventEmitter();

    machine_name = '';
    robot_name = '';
    name = '';
    robot_fullname = '';
    options = [
        'minimum',
        'medium',
        'maximum',
        'lower_limit',
        'upper_limit',
        'standard_mttr',
        'standard_mtbf',
    ];

    machineList: registerMachine[] = DUMMY_MASTER_MACHINE_LIST;
    subjectList: MasterSubject[] = DUMMY_MASTER_SUBJECT_LIST;
    settingList: Setting[] = DUMMY_SETTING_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 100,
        total_count: 100,
        total_pages: 10,
    };

    formGroup: FormGroup = new FormGroup({
        machine_name: new FormControl('', [Validators.required]),
        subject_name: new FormControl('', [Validators.required]),
        unit: new FormControl('', [Validators.required]),
        minimum: new FormControl({ value: null, disabled: true }),
        medium: new FormControl({ value: null, disabled: true }),
        maximum: new FormControl({ value: null, disabled: true }),
        lower_limit: new FormControl({ value: null, disabled: true }),
        upper_limit: new FormControl({ value: null, disabled: true }),
        standard_mttr: new FormControl({ value: null, disabled: true }),
        standard_mtbf: new FormControl({ value: null, disabled: true }),
        minimum_toggle: new FormControl(false),
        medium_toggle: new FormControl(false),
        maximum_toggle: new FormControl(false),
        lower_limit_toggle: new FormControl(false),
        upper_limit_toggle: new FormControl(false),
        standard_mttr_toggle: new FormControl(false),
        standard_mtbf_toggle: new FormControl(false),
    });

    constructor(
        private settingService: SettingService,
        private activatedRoute: ActivatedRoute
    ) {
        // get by params
        this.machine_name = this.activatedRoute.snapshot.queryParams['machine'];
        this.robot_name = this.activatedRoute.snapshot.queryParams['robot'];
        this.robot_fullname = this.robot_name
            ? ` ROBOT ${this.robot_name}`
            : '';
        this.name = this.activatedRoute.snapshot.queryParams['name'];

        // set value to form
        this.formGroup.get('machine_name').patchValue(this.machine_name);
        this.formGroup
            .get('subject_name')
            .patchValue(
                this.name + this.robot_fullname + ' ' + this.machine_name
            );
    }

    ngOnInit() {
        this.initValidators();
        this.fetchSubjectList();
        this.fetchMachineList();
    }

    fetchMachineList() {
        this.settingService
            .getMachineList()
            .pipe(take(1))
            .subscribe(resp => {
                this.machineList = resp.data;
            });
    }

    fetchSubjectList() {
        this.settingService
            .getSubjectList()
            .pipe(take(1))
            .subscribe(resp => {
                this.subjectList = resp.data;
            });
    }

    initValidators() {
        this.options.forEach(option => {
            this.formGroup
                .get(`${option}_toggle`)
                .valueChanges.subscribe(val => {
                    if (val) {
                        this.formGroup.get(option).enable();
                        this.formGroup
                            .get(option)
                            .setValidators([Validators.required]);
                    } else {
                        this.formGroup.get(option).disable();
                        this.formGroup.get(option).setValue(null);
                        this.formGroup
                            .get(option)
                            .removeValidators([Validators.required]);
                    }
                    this.formGroup.get(option).updateValueAndValidity();
                });
        });
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.getRawValue();
            this.options.forEach(o => {
                delete body[`${o}_toggle`];
            });
            this.create(body);
            console.log(body);
        }
    }

    create(body: any) {
        this.finish();
        // this.settingService
        //     .createSetting(body)
        //     .pipe(take(1))
        //     .subscribe({
        //         next: () => {
        //             this.finish();
        //         },
        //         error: () => {
        //             this.finish();
        //         },
        //     });
    }

    finish() {
        this.onSubmit.emit();
        this.formGroup.reset();
    }
}
