import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    ClaimTypeListUserManagement,
    PermissionList,
    PermissionListUserManagement,
    RoleList,
    RoleListUserManagement,
} from 'src/app/core/models/user-management';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    DUMMY_PERMISSIONS_LIST,
    DUMMY_ROLE_LIST,
} from '../permissions-list/permissions-list.dummy';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { DUMMY_CLAIM_PERMISSIONS_LIST } from './permission-upsert.dummy';
import { take } from 'rxjs';

@Component({
    selector: 'ahm-permissions-upsert',
    templateUrl: './permissions-upsert.component.html',
    styleUrls: ['./permissions-upsert.component.scss'],
})
export class PermissionsUpsertComponent {
    @Input() permissions: PermissionListUserManagement;
    @Output() onSubmit = new EventEmitter();

    roleList: RoleList[] = DUMMY_ROLE_LIST;
    claimPermissionList: ClaimTypeListUserManagement[] =
        DUMMY_CLAIM_PERMISSIONS_LIST;

    notSelectedPermissionList: ClaimTypeListUserManagement[] = [];
    selectedPermissionList: ClaimTypeListUserManagement[] = [];

    filteredNotSelectedPermissionList: ClaimTypeListUserManagement[] = [];
    filteredSelectedPermissionList: ClaimTypeListUserManagement[] = [];

    notSelectedFormControl = new FormControl();
    selectedFormControl = new FormControl();

    formGroup: FormGroup = new FormGroup({
        role: new FormControl('', [Validators.required]),
        claim_type: new FormControl(),
    });

    constructor(private userManagementService: UserManagementService) {}

    ngOnInit() {
        this.initList();
        this.notSelectedFormControl.valueChanges.subscribe((text) => {
            this.filteredNotSelectedPermissionList =
                this.notSelectedPermissionList.filter((m) =>
                    m.claim_type.toLowerCase().includes(text.toLowerCase())
                );
        });
        this.selectedFormControl.valueChanges.subscribe((text) => {
            this.filteredSelectedPermissionList =
                this.selectedPermissionList.filter((m) =>
                    m.claim_type.toLowerCase().includes(text.toLowerCase())
                );
        });
        this.selectedFormControl.setValue('');
        this.notSelectedFormControl.setValue('');
    }

    ngOnChanges() {
        this.patchValue();
    }

    selectOneClaimType(permissions: ClaimTypeListUserManagement) {
        permissions.selected = !permissions.selected;
        this.selectedPermissionList.find((m) => m.id == permissions.id).selected = permissions.selected;
    }

    unselectOneClaimType(permissions: ClaimTypeListUserManagement) {
        permissions.selected = !permissions.selected;
        this.selectedPermissionList.find((m) => m.id == permissions.id).selected = permissions.selected;
    }

    unselectBulk() {
        const selected = this.selectedPermissionList.filter((m) => m.selected);
        selected.forEach((m) => {
            m.selected = false;
            this.notSelectedPermissionList.push(m);
            const index = this.selectedPermissionList.findIndex(
                (o) => o.id === m.id
            );
            this.selectedPermissionList.splice(index, 1);
        });
        this.refreshData();
    }

    selectBulk() {
        const selected = this.notSelectedPermissionList.filter(
            (m) => m.selected
        );
        selected.forEach((m) => {
            m.selected = false;
            this.selectedPermissionList.push(m);
            const index = this.notSelectedPermissionList.findIndex(
                (o) => o.id === m.id
            );
            this.notSelectedPermissionList.splice(index, 1);
        });
        this.refreshData();
    }

    selectPermission(index: number) {
        const permissions = this.notSelectedPermissionList[index];
        permissions.selected = false;
        this.selectedPermissionList.push(permissions);
        this.notSelectedPermissionList.splice(index, 1);
        this.refreshData();
    }

    unselectPermission(index: number) {
        const permissions = this.selectedPermissionList[index];
        permissions.selected = false;
        this.notSelectedPermissionList.push(permissions);
        this.selectedPermissionList.splice(index, 1);
        this.refreshData();
    }

    refreshData() {
        this.filteredNotSelectedPermissionList = this.notSelectedPermissionList.filter((m) =>
            m.claim_type.toLowerCase().includes(this.notSelectedFormControl.value.toLowerCase()));
        this.filteredSelectedPermissionList = this.selectedPermissionList.filter((m) =>
            m.claim_type.toLowerCase().includes(this.selectedFormControl.value.toLowerCase()));
    }

    initList() {
        this.notSelectedPermissionList = this.claimPermissionList.filter(
            (m) => true
        );
        this.userManagementService.getRoleList().subscribe((resp) => {
            this.roleList = resp.data;
        });
        this.userManagementService.getListClaimType().subscribe((resp) => {
            this.claimPermissionList = resp.data;
            this.notSelectedPermissionList = this.claimPermissionList.filter(
                (m) => true
            );
            this.refreshData();
        });
    }

    patchValue() {
        if (this.permissions) {
            this.formGroup.get('role').setValue(this.permissions.role_name);
            this.selectBulk();
            this.formGroup.get('claim_type').setValue(this.permissions.claim_type);

        }
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;

            const subject_id = [];
            this.selectedPermissionList.forEach((m) => {
                subject_id.push(m.id);
            });
            body.subject_id = subject_id;

            if (this.permissions) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    edit(body: PermissionList) {
        const id = this.permissions.id;
        this.userManagementService
            .updatePermission(id, body)
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

    create(body: PermissionList) {
        this.userManagementService
            .createPermission(body)
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
        this.notSelectedPermissionList = this.claimPermissionList.filter((m) => true);
        this.selectedPermissionList = [];
        this.refreshData();
    }
}
