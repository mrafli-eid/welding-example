import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { MasterLine } from '../../../../core/models/master.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { take } from 'rxjs';

@Component({
    selector: 'ahm-master-line-upsert',
    templateUrl: './master-line-upsert.component.html',
    styleUrls: ['./master-line-upsert.component.scss'],
})
export class MasterLineUpsertComponent implements OnChanges {
    @Input() masterData: MasterLine;
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
            .updateLine(id, body)
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
            .createLine(body)
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
