import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    baseUrl = `${environment.API_URL}/api/profile`;

    constructor(private http: HttpClient) {}

    changePassword(body: any) {
        return this.http.put<HttpResponse<any>>(`${ this.baseUrl }/change-pass`, body);
    }
}
