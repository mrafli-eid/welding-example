import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../models/http.model';
import { environment } from '../../../environments/environment';
import { notification } from '../models/notification.model';
import { removeEmptyObject } from '../helpers/object.helper';
import { Pagination } from '../models/pagination.model';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    baseUrl = `${environment.API_URL}/api/notification`;

    constructor(private http: HttpClient) {}

    getListNotification() {
        return this.http.get<HttpResponse<notification[]>>(
            `${this.baseUrl}/get-list-notif`
        );
    }
    getAllNotification(params: Partial<Pagination>) {
        if (params) {
            params = removeEmptyObject(params);
        }
        return this.http.get<HttpResponse<notification[]>>(
            `${this.baseUrl}/get-all-notif`,
            {
                observe: 'response',
                params: params,
            }
        );
    }
    updateNotification(id: string) {
        return this.http.put<HttpResponse<notification[]>>(
            `${this.baseUrl}/${id}`,
            { status: true }
        );
    }
}
