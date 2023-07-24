import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUpsertRequest } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    create(userUpsertRequest: UserUpsertRequest) {
        const url = `${ environment.API_URL }/api/authentication`;
        return this.httpClient.post<HttpResponse<any>>(url, userUpsertRequest);
    }
}
