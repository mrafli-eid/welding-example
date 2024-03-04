import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUpsertRequest } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    login(body: any) {
        const url = `${environment.API_URL}/api/authentication/login`;
        return this.httpClient.post<any>(url, body);
    }
}
