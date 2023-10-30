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
        username: new FormControl('', [ Validators.required, Validators.email ]),
        password: new FormControl('', [ Validators.required ]),
    });

    constructor(private router: Router,
                private userService: UserService) {
    }

    login() {
        this.formGroup.markAllAsTouched();
        console.log(this.formGroup.value);
        if (this.formGroup.valid) {
            const body = this.formGroup.value;
            console.log(body);
            if(body.username && body.password){
                this.userService.login(body.username, body.password).subscribe({
                    next: (response) => {
                        // Simpan token ke penyimpanan lokal (localStorage)
                        localStorage.setItem('accessToken', response.accessToken);
                        localStorage.setItem('refreshToken', response.refreshToken);

                        console.log(response.accessToken, response.refreshToken);
                        
                        this.router.navigate(['/dashboard']);
                    },
                    error: () => {
                        console.log('error');
                    }
                });
            }
        }
    }
}
