import { Injectable } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { HubConnectionService } from './hub-connection.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../models/http.model';
import {
    DashboardMachineActivity,
    DashboardMtbf,
    DashboardMttr,
    DashboardGrafikMtbf,
    DashboardGrafikMttr,
    DashboardOilLevel,
    DashboardProductionGraph,
    TimeMachineDetail
} from '../models/dashboard.model';
import { Machine } from "../models/layout-machine.model";

@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    constructor(private http: HttpClient,) {
    }


    getMachineList() {
        return this.http.get<HttpResponse<Machine[]>>(`${ environment.API_URL }/api/machine/get-list-machine`)
            .pipe(map((resp) => {
                resp.data.forEach((m) => {
                    m.value = -1;
                });
                return resp;
            }));
    }

    getTimeMachineDetail(dateFilter: any) {
        return this.http.get<HttpResponse<TimeMachineDetail>>(`${ environment.API_URL }/api/device-data/time-machine-detail/`, {
            params: dateFilter,
        });
    }

    getMachineActivity(dateFilter: any) {
        return this.http.get<HttpResponse<DashboardMachineActivity>>(`${ environment.API_URL }/api/device-data/get-machine-activity-all/`, {
            params: dateFilter,
        });
    }

    getCycleTime(machineName: string, dateFilter: any) {
        return this.http.get<HttpResponse<DashboardOilLevel>>(`${ environment.API_URL }/api/device-data/get-cycle-time/${ machineName }`, {
            params: dateFilter,
        });
    }

    getOilLevel(machineName: string, dateFilter: any) {
        return this.http.get<HttpResponse<DashboardOilLevel>>(`${ environment.API_URL }/api/device-data/get-oil-level/${ machineName }`, {
            params: dateFilter,
        });
    }

    getProductionGraph(machineName: string, dateFilter: any) {
        return this.http.get<HttpResponse<DashboardProductionGraph>>(`${ environment.API_URL }/api/device-data/get-production-graph-all`, {
            params: dateFilter,
        });
    }

    getMachineAlarm(dateFilter: any) {
        return this.http.get<any>(`${ environment.API_URL }/api/device-data/get-five-top-frequency-machine-alarm-all`, {
            params: dateFilter,
        });
    }

    getGrafikMttr(dateFilter: any) {
        return this.http.get<HttpResponse<DashboardGrafikMtbf>>(`${ environment.API_URL }/api/device-data/get-mttr-grafik-all`, {
            params: dateFilter,
        });
    }

    getGrafikMtbf(dateFilter: any) {
        return this.http.get<HttpResponse<DashboardGrafikMttr>>(`${ environment.API_URL }/api/device-data/get-mtbf-grafik-all`, {
            params: dateFilter,
        });
    }

    getMttr(dateFilter: any) {
        return this.http.get<HttpResponse<DashboardMttr>>(`${ environment.API_URL }/api/device-data/get-mttr-all`, {
            params: dateFilter,
        });
    }

    getMtbf(dateFilter: any) {
        return this.http.get<HttpResponse<DashboardMtbf>>(`${ environment.API_URL }/api/device-data/get-mtbf-all`, {
            params: dateFilter,
        });
    }
}
