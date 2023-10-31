import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessLoginComponent } from './dialogs/dialog-success-login/dialog-success-login.component';
import { DialogErrorLoginComponent } from './dialogs/dialog-error-login/dialog-error-login.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    formGroup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private router: Router,
        private userService: UserService,
        private matDialog: MatDialog
    ) {}

    login() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            this.userService.login(body.username, body.password).subscribe({
                next: (response) => {
                    const matDialogRef = this.matDialog.open(
                        DialogSuccessLoginComponent
                    );

                    // save token (localStorage)
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);

                    this.router.navigate(['/dashboard']);
                    matDialogRef.close();
                    console.log(body);
                },
                error: () => {
                },
            });
        }else{
            this.matDialog.open(DialogErrorLoginComponent);
            this.formGroup.patchValue({
                username: '',
                password: '',
            });
        }
    }
}
