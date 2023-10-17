import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    RoleList,
    RoleListUserManagement,
    RoleManagementUpsertRequest,
} from 'src/app/core/models/user-management';
import { UserManagementService } from 'src/app/core/services/user-management.service';

@Component({
    selector: 'ahm-role-upsert',
    templateUrl: './role-upsert.component.html',
    styleUrls: ['./role-upsert.component.scss'],
})
export class RoleUpsertComponent {
    @Input() roleManagement: RoleListUserManagement;
    @Output() onSubmit = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });

    constructor(private userManagementService: UserManagementService) {}

    ngOnChanges() {
        this.formGroup.patchValue(this.roleManagement);
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            if (this.roleManagement) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    edit(body: any) {
        const id = this.roleManagement.id;
        this.userManagementService
            .updateRole(id, body)
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
        this.userManagementService
            .createRole(body)
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
