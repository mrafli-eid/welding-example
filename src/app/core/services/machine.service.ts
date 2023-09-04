import { Injectable } from '@angular/core';
import { HttpResponse } from '../models/http.model';
import { HttpClient } from '@angular/common/http';
import {
    DetailMachine,
    DetailMachineActivityMachine,
    DetailMachineActualMaintenance,
    DetailMachineActualMaintenanceParams,
    DetailMachineAlarm,
    DetailMachineAmpereAndVoltage,
    DetailMachineDescription,
    DetailMachineDewPoint,
    DetailMachineHistoryAlarm,
    DetailMachineHistoryAlarmParams,
    DetailMachineLubOilPressure,
    DetailMachineProductionGraph,
    DetailMachineRunningHour,
    DetailMachineRurgeCell,
    DetailMachineSansoMatic,
    DetailMachineServoLoad,
    DetailMachineTemperatureMirror,
    DetailMachineRpmSpindle
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
        if(machine_name == "LASER"){
          return this.http.get<HttpResponse<DetailMachine[]>>(`${this.baseUrl}/get-detail-machines-all/${machine_name}`);
        }else if(machine_name == "BORRING" || machine_name == "BORRING"){
          return this.http.get<HttpResponse<DetailMachine[]>>(`${this.baseUrl}/get-detail-machines-all/${machine_name}`);
        }else{
          return this.http.get<HttpResponse<DetailMachine[]>>(`${ this.baseUrl }/get-detail-machine-all/${ machine_name }`);
        }
    }

    /** Alarm **/
    getAlarm(machine_name: string, robot_name: string, params: Partial<DateFilter>) {
        if(machine_name == "LASER"){
          return this.http.get<HttpResponse<DetailMachineAlarm>>(`${ this.baseUrl }/get-alarm-all/${ machine_name }`, { params });
        }else if(machine_name == "BORING" || machine_name == "BORRING"){
          return this.http.get<HttpResponse<DetailMachineAlarm>>(`${ this.baseUrl }/get-alarm-all/${ machine_name }`, { params });
        }else{
          return this.http.get<HttpResponse<DetailMachineAlarm>>(`${ this.baseUrl }/get-alarm-all/${ machine_name }/${robot_name}`, { params });
        }
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

    /** Activity Machine **/
    getActivityMachine(machine_name: string, params: Partial<DateFilter>) {
        if(machine_name == "LASER"){
          return this.http.get<HttpResponse<DetailMachineActivityMachine>>(`${this.baseUrl}/get-activity-machines-all/${machine_name}`, { params }); 
        } else if (machine_name == "BORING" || machine_name == "BORRING"){
          return this.http.get<HttpResponse<DetailMachineActivityMachine>>(`${this.baseUrl}/get-activity-machines-all/${machine_name}`, { params }); 
        }else{
          return this.http.get<HttpResponse<DetailMachineActivityMachine>>(`${ this.baseUrl }/get-activity-machine-all/${ machine_name }`, { params });
        }
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
        if(machine_name == "LASER"){
          return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(`${ this.baseUrl }/get-history-alarm-all/${ machine_name }`, {
              observe: 'response',
              params
          });
        } else if (machine_name == "BORING" || machine_name == "BORRING"){
          return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(`${ this.baseUrl }/get-history-alarm-all/${ machine_name }`, {
              observe: 'response',
              params
          });
        }else{
          return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(`${this.baseUrl}/get-history-alarm-all/${machine_name}/${robot_name}`, {
            observe: 'response',
             
          });
        }
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

    /** Production Graph **/
    getProductionGraph(machine_name: string, params: Partial<DateFilter>) {
        if(machine_name == "LASER"){
          return this.http.get<HttpResponse<DetailMachineProductionGraph>>(`${this.baseUrl}/get-productions-all/${machine_name}`, { params });
        } else if (machine_name == "BORING" || machine_name == "BORRING"){
          return this.http.get<HttpResponse<DetailMachineProductionGraph>>(`${this.baseUrl}/get-productions-all/${machine_name}`, { params });
        }else{
          return this.http.get<HttpResponse<DetailMachineProductionGraph>>(`${ this.baseUrl }/get-production-all/${ machine_name }`, { params });
        }
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
  getActualMaintenance(machine_name: string, params: Partial<DetailMachineActualMaintenanceParams>) {
    return this.http.get<HttpResponse<DetailMachineActualMaintenance[]>>(`${environment.API_URL}/api/machine/get-plan-and-actual-all/${machine_name }`, {
            observe: 'response',
            params,
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
  
  getAmpere(machine_name: string, robot_name: string, params: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineAmpereAndVoltage>>(`${this.baseUrl}/get-ampere-all/${machine_name}/${robot_name}`, { params })
  }
  
  getVoltage(machine_name: string, robot_name: string, params: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineAmpereAndVoltage>>(`${this.baseUrl}/get-voltage-all/${machine_name}/${robot_name}`, { params })
  }
  
  getServoLoad(machine_name: string, robot_name: string, params: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineServoLoad>>(`${this.baseUrl}/get-servo-load-all/${machine_name}/${robot_name}`, { params })
  }
  
  // INTEGRASI API LASER
  getTemperatureMirror(machine_name: string, params?: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineTemperatureMirror>>(`${this.baseUrl}/get-temp-mirror-all/${machine_name}`, { params })
  }
  
  getDewPoint(machine_name: string, params?: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineDewPoint>>(`${this.baseUrl}/get-dew-point-all/${machine_name}`, { params })
  }
  
  getRurgeCell(machine_name: string, params?: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineRurgeCell>>(`${this.baseUrl}/get-rurge-cell-all/${machine_name}`, { params })
  }
  
  getRpmSpindle(machine_name: string, params?: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineRpmSpindle>>(`${this.baseUrl}/get-rpm-spindle-all/${machine_name}`, { params })
  }

  // INTEGRASI API BORING
  getSansoMatic(machine_name: string, params?: Partial<DateFilter>){
    return this.http.get<HttpResponse<DetailMachineSansoMatic>>(`${this.baseUrl}/get-sanso-matic-all/${machine_name}`, { params })
  }
}
