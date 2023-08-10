import { Injectable } from '@angular/core';
import { HttpResponse } from '../models/http.model';
import { HttpClient } from '@angular/common/http';
import {
    DetailMachine,
    DetailMachineActivityMachine,
    DetailMachineActualMaintenance,
    DetailMachineActualMaintenanceParams,
    DetailMachineAlarm,
    DetailMachineCnbLubOilPressure,
    DetailMachineDescription,
    DetailMachineHistoryAlarm,
    DetailMachineHistoryAlarmParams,
    DetailMachineLubOilPressure,
    DetailMachinePressLoad,
    DetailMachineProductionGraph,
    DetailMachineRunningHour
} from '../models/machine.model';
import { environment } from '../../../environments/environment';
import { DateFilter } from '../models/date-filter.model';
import { downLoadFile } from '../helpers/http.helper';

@Injectable({
    providedIn: 'root',
})
export class MachineService {
    baseUrl = `${ environment.API_URL }/api/detail-machine`;

    constructor(private http: HttpClient) {
    }

    /** Detail Machine **/
    getDetailMachine(machine_name: string) {
        return this.http.get<HttpResponse<DetailMachine[]>>(`${ this.baseUrl }/get-detail-machine-all/${ machine_name }`);
    }

    /** Alarm **/
    getAlarm(machine_name: string, robot_name: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineAlarm>>(`${ this.baseUrl }/get-alarm-all/${ machine_name }/${robot_name}`, { params });
    }

    downloadAlarm(id: string, params: Partial<DateFilter>) {
        const queryParams= {
            machine: id,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-alarm-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }


    /** Press Load (Ton/Force) **/
    getPressLoad(id: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachinePressLoad[]>>(`${ this.baseUrl }/get-press-load-all/${ id }`, { params });
    }

    downloadPressLoad(id: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine: id,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-press-load-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    /** Activity Machine **/
    getActivityMachine(machine_name: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineActivityMachine>>(`${ this.baseUrl }/get-activity-machine-all/${ machine_name }`, { params });
    }

    downloadActivityMachine(id: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine: id,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-activity-machine-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    /** History Alarm **/
    getHistoryAlarm(machine_name: string, robot_name: string, params: Partial<DetailMachineHistoryAlarmParams>) {
        return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(`${ this.baseUrl }/get-history-alarm-all/${ machine_name }/${robot_name}`, {
            observe: 'response',
            params
        });
    }

    downloadHistoryAlarm(id: string, params: Partial<DetailMachineHistoryAlarmParams>) {
        const queryParams = {
            machine: id,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-history-alarm-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    getDescription() {
        return this.http.get<HttpResponse<DetailMachineDescription[]>>(`${ this.baseUrl }/get-list-description-history-alarm-all`);
    }

    /** C&B Lub Oil Pressure **/
    getCnbLubOilPressure(id: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineCnbLubOilPressure[]>>(`${ this.baseUrl }/get-c-b-lub-oil-pressure-all/${ id }`, { params });
    }

    downloadCnbLubOilPressure(id: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine: id,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-c-b-lub-oil-pressure-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    /** Production Graph **/
    getProductionGraph(machine_name: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineProductionGraph>>(`${ this.baseUrl }/get-production-all/${ machine_name }`, { params });
    }

    downloadProductionGraph(machine_name: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine: machine_name,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-production-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    /** Actual Maintenance **/
    getActualMaintenance(id: string, params: Partial<DetailMachineActualMaintenanceParams>) {
        return this.http.get<HttpResponse<DetailMachineActualMaintenance[]>>(`${ environment.API_URL }/api/machine/get-plan-and-actual-all/${ id }`, {
            observe: 'response',
            params
        });
    }

    /** Lub Oil Pressure **/
    getLubOilPressure(id: string, params: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineLubOilPressure[]>>(`${ this.baseUrl }/get-lub-oil-pressure-all/${ id }`, { params });
    }

    downloadLubOilPressure(id: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine: id,
            ...params
        };

        this.http.get(`${ this.baseUrl }/get-download-excel-lub-oil-pressure-all`, {
            responseType: "arraybuffer",
            params: queryParams
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

  getRunningHour(machine_name: string, robot_name: string, params: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineRunningHour>>(`${this.baseUrl}/get-running-hour-all/${machine_name}/${robot_name}`, { params })
  }
}
