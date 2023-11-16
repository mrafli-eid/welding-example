import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterParams } from '../models/master.model';
import { environment } from '../../../environments/environment';
import { removeEmptyObject } from '../helpers/object.helper';
import { HttpResponse } from '../models/http.model';
import { MaintenancePreventive, MaintenancePreventiveChart, MaintenancePreventiveParams } from '../models/maintenance-preventive.model';
import { downLoadFile } from '../helpers/http.helper';
import { Schedule } from '../models/schedule.model';
import { DateFilter } from '../models/date-filter.model';

@Injectable({
    providedIn: 'root',
})
export class MaintenancePreventiveService {

    baseUrl = `${ environment.API_URL }/api/maintenance-preventive`;

    constructor(private http: HttpClient) {
    }

    getList(machine_name: string, params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MaintenancePreventive[]>>(`${ this.baseUrl }/get-maintenance-preventive-all/${machine_name}`, {
            observe: 'response',
            params: params,
        });
    }

    getChart(machine_name: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<MaintenancePreventiveChart[]>>(`${ this.baseUrl }/get-maintenance-preventive-grafik-all/${machine_name}`, { params });
    }

    getSchedule(machine_name: string, start: Date, end: Date) {
        const params = { start: start.toUTCString(), end: end.toUTCString() };
        return this.http.get<HttpResponse<Schedule[]>>(`${ this.baseUrl }/get-schedule/${machine_name}`, { params });
    }

    create(body: any, params?: Partial<MaintenancePreventiveParams>) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrl }/create-maintenance-preventive`, body, {
            params: params,
        });
    }

    delete(id: string) {
        return this.http.delete<HttpResponse<any>>(`${ this.baseUrl }/${ id }`);
    }

    update(id: string, body: any) {
        return this.http.put<HttpResponse<any>>(`${ this.baseUrl }/update/${id}`, body);
    }

    ok(id: string, body: any) {
        return this.http.put<HttpResponse<any>>(`${ this.baseUrl }/ok/${id}`, body);
    }

    exportExcel(machine_name: string, params: Partial<MasterParams>) {
        const queryParams = {
            ...params,
            machine: machine_name
        }

        this.http.get(`${ this.baseUrl }/download-excel-preventive`, {
            params: queryParams,
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    upload(file: File) {
        const formData = new FormData();
        formData.append('maintenance', file);

        return this.http.post(`${ this.baseUrl }/upload-excel`, formData);
    }


}
