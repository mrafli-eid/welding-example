import { Component, Renderer2, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'ahm-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
    id_user: string;
    image_url: string = null;
    username: string;
    email: string;

    formGroup: FormGroup = new FormGroup({
        current_password: new FormControl('', Validators.required),
        new_password: new FormControl('', Validators.required),
        repeat_password: new FormControl('', Validators.required),
    });

    private renderer = inject(Renderer2);
    private accountService = inject(AccountService);

    constructor() {
        this.id_user = localStorage.getItem('id_user');
        this.getListAccount();
    }

    getListAccount() {
        this.accountService
            .getListAccount(this.id_user)
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    this.image_url = `${environment.API_URL}/${res.data[0].img_path}`;
                    this.username = res.data[0].username;
                    this.email = res.data[0].email;
                },
            });
    }

    changePassword() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = {
                id_user: this.id_user,
                current_password: this.formGroup.get('current_password').value,
                new_password: this.formGroup.get('new_password').value,
                repeat_password: this.formGroup.get('repeat_password').value,
            };
            console.log(body);
            this.accountService
                .changePassword(body)
                .pipe(take(1))
                .subscribe({
                    next: res => {
                        this.formGroup.reset();
                    },
                });
        }
    }

    resetPassword() {
        this.formGroup.setValue({
            current_password: '',
            new_password: '',
            repeat_password: '',
        });
    }

    onChange(event) {
        console.log(event.target.files[0]);
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const maxSize = 2 * 1024 * 1024;

            const form = new FormData();
            form.append('img_path', file);

            this.accountService
                .uploadImage(this.id_user, form)
                .pipe(take(1))
                .subscribe({
                    next: (res: any) => {
                        this.getListAccount();
                    },
                });
        }
    }

    clickInputFile() {
        this.renderer.selectRootElement('#file').click();
    }

    deleteFileImage() {
        this.accountService
            .deleteAccount(this.id_user)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.getListAccount();
                },
            });
    }
}
