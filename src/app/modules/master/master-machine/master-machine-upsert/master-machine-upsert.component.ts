import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { MasterMachine } from '../../../../core/models/master.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { take } from 'rxjs';

@Component({
    selector: 'ahm-master-machine-upsert',
    templateUrl: './master-machine-upsert.component.html',
    styleUrls: ['./master-machine-upsert.component.scss'],
})
export class MasterMachineUpsertComponent implements OnChanges {
    @Input() masterData: MasterMachine;
    @Output() onSubmit = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });

    constructor(private masterService: MasterService) {}

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
        this.masterService
            .updateMachine(id, body)
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
        this.masterService
            .createMachine(body)
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
