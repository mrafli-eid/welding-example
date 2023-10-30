import { Injectable } from '@angular/core';
import { UserLoginRequest, UserLoginResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    token: string = '';
    authData: UserLoginResponse;

    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    login(userLoginRequest: UserLoginRequest) {
        const url = `${ environment.API_URL }/api/authentication/login`;
        return this.httpClient.post<UserLoginResponse>(url, userLoginRequest);
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        this.token = '';
        this.authData = null;
        this.router.navigate([ '/login' ]);
    }
}
