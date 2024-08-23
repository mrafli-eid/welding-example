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
    UserListUserManagement,
    UserManagementUpsertRequest,
} from 'src/app/core/models/user-management';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { ROLE_LIST_DUMMY } from '../../role/role-list/role-list.dummy';
import {
    DUMMY_LIST_ROLE,
    DUMMY_SELECT_MULTIPLE,
} from '../user-list/user-list.dummy';

@Component({
    selector: 'ahm-user-upsert',
    templateUrl: './user-upsert.component.html',
    styleUrls: ['./user-upsert.component.scss'],
})
export class UserUpsertComponent {
    @Input() userManagement: UserListUserManagement;
    @Output() onSubmit = new EventEmitter();

    formGroup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });
    roleList = DUMMY_LIST_ROLE;
    roleListMultiple = ['Admin', 'User'];

    constructor(private userManagementService: UserManagementService) {}

    ngOnChanges() {
        this.formGroup.patchValue(this.userManagement);
        this.getRoleList();
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            if (this.userManagement) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    getRoleList() {
        this.userManagementService
            .getRoleList()
            .pipe(take(1))
            .subscribe({
                next: response => {
                    response.data.map(role => {
                        this.roleListMultiple.push(role.name);
                    });
                },
                error: () => {
                    console.log('error');
                },
            });
    }

    edit(body: any) {
        this.finish()
        // const id = this.userManagement.id;
        // this.userManagementService
        //     .updateUser(id, body)
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
        this.finish()
        // this.userManagementService
        //     .createUser(body)
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
