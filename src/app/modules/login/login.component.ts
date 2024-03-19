import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessLoginComponent } from './dialogs/dialog-success-login/dialog-success-login.component';
import { DialogErrorLoginComponent } from './dialogs/dialog-error-login/dialog-error-login.component';
import { take } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    accessToken: string;
    refreshToken: string;
    decodedToken: any;
    
    formGroup: FormGroup = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private router: Router,
        private userService: UserService,
        private matDialog: MatDialog
    ) {}

    login() {
        this.formGroup.markAllAsTouched();
        const body = this.formGroup.value;

        // Service login
        this.userService
            .login(body)
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    const matDialogRef = this.matDialog.open(
                        DialogSuccessLoginComponent
                    );

                    this.accessToken = res.accessToken;
                        this.refreshToken = res.refreshToken;

                        setTimeout(() => {
                            matDialogRef.close();
                        }, 2000);

                        // Decode token
                        this.decodedToken = jwtDecode(this.accessToken);
                        localStorage.setItem('id_user', this.decodedToken.id);
                        console.log('id_user', localStorage.getItem('id_user'));

                        return this.router.navigate(['/dashboard']);
                },
                error: () => {
                    this.matDialog.open(DialogErrorLoginComponent);
                    this.formGroup.patchValue({
                        username: '',
                        password: '',
                    });
                },
            });
    }
}
