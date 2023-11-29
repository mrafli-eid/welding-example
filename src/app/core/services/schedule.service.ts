import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';
import { Schedule } from '../models/schedule.model';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor(private http: HttpClient) {}

    getSchedule(start: Date, end: Date) {
        const params = { start: start.toUTCString(), end: end.toUTCString() };
        return this.http.get<HttpResponse<Schedule[]>>(
            `${environment.API_URL}/api/maintenance-preventive/get-schedule`,
            { params }
        );
    }
}
