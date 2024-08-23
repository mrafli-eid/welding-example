import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { MasterSubject } from '../../../../core/models/master.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../core/services/master.service';
import { take } from 'rxjs';

@Component({
    selector: 'ahm-master-subject-upsert',
    templateUrl: './master-subject-upsert.component.html',
    styleUrls: ['./master-subject-upsert.component.scss'],
})
export class MasterSubjectUpsertComponent implements OnChanges {
    @Input() masterData: MasterSubject;
    @Output() onSubmit = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        vid: new FormControl('', [Validators.required]),
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
        this.finish();
        // const id = this.masterData.id;
        // this.masterService
        //     .updateSubject(id, body)
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

    create(body: any) {
        this.finish();
        // this.masterService
        //     .createSubject(body)
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
