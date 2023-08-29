import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MasterRobot } from '../../../../core/models/master.model';
import { MasterMachine } from '../../../../core/models/master.model';
import { DUMMY_MACHINE_LIST, DUMMY_MACHINE } from './master-robot.dummy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-master-robot-upsert',
    templateUrl: './master-robot-upsert.component.html',
    styleUrls: ['./master-robot-upsert.component.scss'],
})

export class MasterRobotUpsertComponent {
    @Input() masterData: MasterRobot;
    @Output() onSubmit = new EventEmitter();

    categoryLineList: MasterMachine[] = DUMMY_MACHINE_LIST;

    formGroup: FormGroup = new FormGroup({
        category_line_id: new FormControl('', [ Validators.required ]),
        name: new FormControl('', [ Validators.required ]),
    });

    constructor(private masterService: MasterService,
                ) {
    }

    ngOnInit() {
        this.masterService.getListMachine().subscribe((resp) => {
            this.categoryLineList = resp.data;
        });
    }


    ngOnChanges() {
        this.formGroup.patchValue(this.masterData);
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            if (this.masterData) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    edit(body: any) {
        const id = this.masterData.id;
        this.masterService.updateLine(id, body)
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
        this.masterService.createLine(body)
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

    protected readonly DUMMY_MACHINE = DUMMY_MACHINE;
}
