import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';
import { UserActivity, UsernameList } from '../models/user-activity.model';
import { MasterParams } from '../models/master.model';
import { removeEmptyObject } from '../helpers/object.helper';

@Injectable({
    providedIn: 'root',
})
export class ActivityUserService {
    constructor(private http: HttpClient) {}

    baseUrl = `${environment.API_URL}/api/activity`;

    getUsernameList() {
        return this.http.get<HttpResponse<UsernameList[]>>(
            `${this.baseUrl}/get-list-username`
        );
    }

    getLogTypeList() {
        return this.http.get<HttpResponse<any[]>>(
            `${this.baseUrl}/get-list-log-type`
        );
    }

    getActivityUserList(params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<UserActivity[]>>(
            `${this.baseUrl}/get-activity-user`,
            {
                observe: 'response',
                params: params,
            }
        );
    }
}
