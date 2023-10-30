import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
})
export class LoginComponent {
    formGroup: FormGroup = new FormGroup({
        email: new FormControl('', [ Validators.required, Validators.email ]),
        password: new FormControl('', [ Validators.required ]),
    });

    constructor(private router: Router,
                private userService: UserService) {
    }

    login() {
        this.router.navigate([ '/dashboard' ]);
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            console.log(body);
            this.userService.login(body).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
                },
                error: () => {
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}
