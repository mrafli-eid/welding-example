import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleList, UserManagementUpsertRequest } from 'src/app/core/models/user-management';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { ROLE_LIST_DUMMY } from '../../role/role-list/role-list.dummy';


@Component({
    selector: 'ahm-user-upsert',
    templateUrl: './user-upsert.component.html',
    styleUrls: ['./user-upsert.component.scss'],
})
export class UserUpsertComponent {
    @Input() userManagement: UserManagementUpsertRequest[];
    @Output() onSubmit = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });
    roleList: RoleList[] = ROLE_LIST_DUMMY;

    constructor(private userManagementService: UserManagementService) {}

    ngOnChanges() {
        this.formGroup.patchValue(this.userManagement);
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            if (this.userManagement) {
                // this.edit(body);
            } else {
                // this.create(body);
            }
        }
    }

    // edit(body: any) {
    //     const id = this.masterData.id;
    //     this.userManagementService
    //         .updateSubject(id, body)
    //         .pipe(take(1))
    //         .subscribe({
    //             next: () => {
    //                 this.finish();
    //             },
    //             error: () => {
    //                 this.finish();
    //             },
    //         });
    // }

    // create(body: any) {
    //     this.masterService
    //         .createSubject(body)
    //         .pipe(take(1))
    //         .subscribe({
    //             next: () => {
    //                 this.finish();
    //             },
    //             error: () => {
    //                 this.finish();
    //             },
    //         });
    // }

    finish() {
        this.onSubmit.emit();
        this.formGroup.reset();
    }
}
