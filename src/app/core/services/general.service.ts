import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GeneralService {
    constructor(private http: HttpClient) {}

    getChartData(generalType: GeneralType, dateFilter: any) {
        return this.http.get<any>(`${environment.API_URL}${generalType.url}`, {
            params: dateFilter,
        });
    }
}

export interface GeneralType {
    name: string;
    url: string;
}

export class GENERAL_TYPE {
    static readonly CYCLE_TIME: GeneralType = {
        name: 'CYCLE_TIME',
        url: '/api/device-data/get-cycle-time-all',
    };
    static readonly OIL_LEVEL: GeneralType = {
        name: 'OIL_LEVEL',
        url: '/api/device-data/get-oil-level-all',
    };
    static readonly PRODUCTION_GRAPH: GeneralType = {
        name: 'PRODUCTION_GRAPH',
        url: '/api/device-data/get-production-graph-all',
    };
    static readonly MACHINE_ALARM: GeneralType = {
        name: 'MACHINE_ALARM',
        url: '/api/device-data/get-five-top-frequency-machine-alarm-all',
    };
}
