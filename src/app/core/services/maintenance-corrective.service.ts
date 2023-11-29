import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterParams } from '../models/master.model';
import { environment } from '../../../environments/environment';
import { removeEmptyObject } from '../helpers/object.helper';
import { HttpResponse } from '../models/http.model';
import { downLoadFile } from '../helpers/http.helper';
import { DateFilter } from '../models/date-filter.model';
import {
    MaintenanceCorrective,
    MaintenanceCorrectiveChart,
    MaintenanceCorrectiveUpsert,
} from '../models/maintenance-corrective.model';

@Injectable({
    providedIn: 'root',
})
export class MaintenanceCorrectiveService {
    baseUrl = `${environment.API_URL}/api/maintenance-corrective`;

    constructor(private http: HttpClient) {}

    getList(machine_name: string, params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MaintenanceCorrective[]>>(
            `${this.baseUrl}/get-maintenance-corrective-all/${machine_name}`,
            {
                observe: 'response',
                params: params,
            }
        );
    }

    getChart(machine_name: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<MaintenanceCorrectiveChart[]>>(
            `${this.baseUrl}/get-maintenance-corrective-grafik-all/${machine_name}`,
            { params }
        );
    }

    create(body: any) {
        return this.http.post<HttpResponse<any>>(
            `${this.baseUrl}/create-maintenance-corrective`,
            body
        );
    }

    delete(id: string) {
        return this.http.delete<HttpResponse<any>>(`${this.baseUrl}/${id}`);
    }

    update(id: string, body: MaintenanceCorrectiveUpsert) {
        return this.http.put<HttpResponse<any>>(
            `${this.baseUrl}/update/${id}`,
            body
        );
    }

    exportExcel(machine_name: string, params: Partial<MasterParams>) {
        const queryParams = {
            ...params,
            machine: machine_name,
        };

        this.http
            .get(`${this.baseUrl}/download-excel-corrective`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response',
            })
            .subscribe(response => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
    }
}
