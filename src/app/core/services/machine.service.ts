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
    DetailMachineDewPoint,
    DetailMachineHistoryAlarm,
    DetailMachineHistoryAlarmParams,
    DetailMachineProductionGraph,
    DetailMachineRunningHour,
    DetailMachineRurgeCell,
    DetailMachineSansoMatic,
    DetailMachineServoLoad,
    DetailMachineTemperatureMirror,
    DetailMachineRpmSpindle,
} from '../models/machine.model';
import { environment } from '../../../environments/environment';
import { DateFilter } from '../models/date-filter.model';
import { downLoadFile } from '../helpers/http.helper';

@Injectable({
    providedIn: 'root',
})
export class MachineService {
    baseUrl = `${environment.API_URL}/api/detail-machine`;

    constructor(private http: HttpClient) {}

    /** Detail Machine **/
    getDetailMachine(machine_name: string) {
        if (machine_name == 'LASER') {
            return this.http.get<HttpResponse<DetailMachine[]>>(
                `${this.baseUrl}/get-detail-machines-all/${machine_name}`
            );
        } else if (machine_name == 'BORRING' || machine_name == 'BORRING') {
            return this.http.get<HttpResponse<DetailMachine[]>>(
                `${this.baseUrl}/get-detail-machines-all/${machine_name}`
            );
        } else {
            return this.http.get<HttpResponse<DetailMachine[]>>(
                `${this.baseUrl}/get-detail-machine-all/${machine_name}`
            );
        }
    }

    /** Alarm **/
    getAlarm(
        machine_name: string,
        robot_name: string,
        params: Partial<DateFilter>
    ) {
        if (machine_name == 'LASER') {
            return this.http.get<HttpResponse<DetailMachineAlarm>>(
                `${this.baseUrl}/get-alarm-all/${machine_name}`,
                { params }
            );
        } else if (machine_name == 'BORRING') {
            return this.http.get<HttpResponse<DetailMachineAlarm>>(
                `${this.baseUrl}/get-alarm-all/${machine_name}`,
                { params }
            );
        } else {
            return this.http.get<HttpResponse<DetailMachineAlarm>>(
                `${this.baseUrl}/get-alarm-all/${machine_name}/${robot_name}`,
                { params }
            );
        }
    }

    downloadAlarm(machine_name: string, params: Partial<DateFilter>, robot_name?: string) {
        if(machine_name == 'BORRING' || machine_name == 'LASER'){
            const queryParams = {
                machine_name: machine_name,
                ...params,
            };

            this.http.get(`${this.baseUrl}/get-download-excel-alarm-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
            
        }else {
            const queryParams = {
                machine_name: machine_name,
                robot_name: robot_name,
                ...params,
            };

            this.http.get(`${this.baseUrl}/get-download-excel-alarm-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
        }
        
    }

    /** Activity Machine **/
    getActivityMachine(machine_name: string, params: Partial<DateFilter>) {
        if (machine_name == 'LASER') {
            return this.http.get<HttpResponse<DetailMachineActivityMachine>>(
                `${this.baseUrl}/get-activity-machines-all/${machine_name}`,
                { params }
            );
        } else if (machine_name == 'BORRING') {
            return this.http.get<HttpResponse<DetailMachineActivityMachine>>(
                `${this.baseUrl}/get-activity-machines-all/${machine_name}`,
                { params }
            );
        } else {
            return this.http.get<HttpResponse<DetailMachineActivityMachine>>(
                `${this.baseUrl}/get-activity-machine-all/${machine_name}`,
                { params }
            );
        }
    }

    downloadActivityMachine(id: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine_name: id,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-activity-machine-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
    }

    /** History Alarm **/
    getHistoryAlarm(
        machine_name: string,
        robot_name: string,
        params: Partial<DetailMachineHistoryAlarmParams>
    ) {
        if (machine_name == 'LASER') {
            return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(
                `${this.baseUrl}/get-history-alarm-all/${machine_name}`,
                {
                    observe: 'response',
                    params,
                }
            );
        } else if (machine_name == 'BORRING') {
            return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(
                `${this.baseUrl}/get-history-alarm-all/${machine_name}`,
                {
                    observe: 'response',
                    params,
                }
            );
        } else {
            return this.http.get<HttpResponse<DetailMachineHistoryAlarm[]>>(
                `${this.baseUrl}/get-history-alarm-all/${machine_name}/${robot_name}`,
                {
                    observe: 'response',
                    params,
                }
            );
        }
    }

    downloadHistoryAlarm(machine_name: string, robot_name: string, params: Partial<DetailMachineHistoryAlarmParams>) {
        if(machine_name == 'BORRING' || machine_name == 'LASER'){
            const queryParams = {
                machine_name: machine_name,
                ...params,
            };

            this.http.get(`${this.baseUrl}/get-download-excel-history-alarm-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
            });
        }else{
            const queryParams = {
                machine_name: machine_name,
                robot_name: robot_name,
                ...params,
            };
    
            this.http
                .get(`${this.baseUrl}/get-download-excel-history-alarm-all`, {
                    responseType: 'arraybuffer',
                    params: queryParams,
                    observe: 'response'
                })
                .subscribe((response) => {
                    const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
                });
        }
    }

    /** Production Graph **/
    getProductionGraph(machine_name: string, params: Partial<DateFilter>) {
        if (machine_name == 'LASER') {
            return this.http.get<HttpResponse<DetailMachineProductionGraph>>(
                `${this.baseUrl}/get-productions-all/${machine_name}`,
                { params }
            );
        } else if (machine_name == 'BORRING') {
            return this.http.get<HttpResponse<DetailMachineProductionGraph>>(
                `${this.baseUrl}/get-productions-all/${machine_name}`,
                { params }
            );
        } else {
            return this.http.get<HttpResponse<DetailMachineProductionGraph>>(
                `${this.baseUrl}/get-production-all/${machine_name}`,
                { params }
            );
        }
    }

    downloadProductionGraph(machine_name: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-production-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                console.log(fileName);
                downLoadFile(response.body, fileName);
                console.log(response.body);
            });
    }

    /** Actual Maintenance **/
    getActualMaintenance(
        machine_name: string,
        params: Partial<DetailMachineActualMaintenanceParams>
    ) {
        return this.http.get<HttpResponse<DetailMachineActualMaintenance[]>>(
            `${environment.API_URL}/api/machine/get-plan-and-actual-all/${machine_name}`,
            {
                observe: 'response',
                params,
            }
        );
    }

    getRunningHour(
        machine_name: string,
        robot_name?: string,
        params?: Partial<DateFilter>
    ) {
        if (machine_name == 'BORRING') {
            return this.http.get<HttpResponse<DetailMachineRunningHour>>(
                `${this.baseUrl}/get-running-hour-all/${machine_name}`,
                { params }
            );
        } else {
            return this.http.get<HttpResponse<DetailMachineRunningHour>>(
                `${this.baseUrl}/get-running-hour-all/${machine_name}/${robot_name}`,
                { params }
            );
        }
    }

    downloadRunningHour(machine_name: string, robot_name: string, params?: Partial<DateFilter>) {
        if(machine_name == 'BORRING'){
            const queryParams = {
                machine_name: machine_name,
                ...params,
            };

            this.http.get(`${this.baseUrl}/get-download-excel-running-hours-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
            });
        }else{
            const queryParams = {
                machine_name: machine_name,
                robot_name: robot_name,
                ...params,
            };
    
            this.http
                .get(`${this.baseUrl}/get-download-excel-running-hour-all`, {
                    responseType: 'arraybuffer',
                    params: queryParams,
                    observe: 'response'
                })
                .subscribe((response) => {
                    const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
                });

        }
    }

    getAmpere(
        machine_name: string,
        robot_name: string,
        params: Partial<DateFilter>
    ) {
        return this.http.get<HttpResponse<DetailMachineAmpereAndVoltage>>(
            `${this.baseUrl}/get-ampere-all/${machine_name}/${robot_name}`,
            { params }
        );
    }

    getVoltage(
        machine_name: string,
        robot_name: string,
        params: Partial<DateFilter>
    ) {
        return this.http.get<HttpResponse<DetailMachineAmpereAndVoltage>>(
            `${this.baseUrl}/get-voltage-all/${machine_name}/${robot_name}`,
            { params }
        );
    }

    downloadVoltage(machine_name: string, robot_name: string, params: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            robot_name: robot_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-voltage-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
            });
    }

    getServoLoad(
        machine_name: string,
        robot_name: string,
        params?: Partial<DateFilter>
    ) {
        return this.http.get<HttpResponse<DetailMachineServoLoad>>(
            `${this.baseUrl}/get-servo-load-all/${machine_name}/${robot_name}`,
            { params }
        );
    }

    downloadServoLoad(
        machine_name: string,
        robot_name: string,
        params?: Partial<DateFilter>
    ){
        const queryParams = {
            machine_name: machine_name,
            robot_name: robot_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-servo-load-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                console.log(fileName);
                downLoadFile(response.body, fileName);
                console.log(response.body);
            });
    }

    // INTEGRASI API LASER
    getTemperatureMirror(machine_name: string, params?: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineTemperatureMirror>>(
            `${this.baseUrl}/get-temp-mirror-all/${machine_name}`,
            { params }
        );
    }

    downloadTemperatureMirror(machine_name: string, params?: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-temperature-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
            });
    }

    getDewPoint(machine_name: string, params?: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineDewPoint>>(
            `${this.baseUrl}/get-dew-point-all/${machine_name}`,
            { params }
        );
    }

    downloadDewPoint(machine_name: string, params?: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-dew-point-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
            downLoadFile(response.body, fileName);
            });
    }

    getRurgeCell(machine_name: string, params?: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineRurgeCell>>(
            `${this.baseUrl}/get-rurge-cell-all/${machine_name}`,
            { params }
        );
    }

    downloadRurgeCell(machine_name: string, params?: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            ...params,
        };

        this.http.get(`${this.baseUrl}/get-download-excel-rurge-cell-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
    }

    getRpmSpindle(machine_name: string, params?: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineRpmSpindle>>(
            `${this.baseUrl}/get-rpm-spindle-all/${machine_name}`,
            { params }
        );
    }

    downloadRpmSpindle(machine_name: string, params?: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-rpm-spindle-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
    }

    // INTEGRASI API BORING
    getSansoMatic(machine_name: string, params?: Partial<DateFilter>) {
        return this.http.get<HttpResponse<DetailMachineSansoMatic>>(
            `${this.baseUrl}/get-sanso-matic-all/${machine_name}`,
            { params }
        );
    }

    downloadSansoMatic(machine_name: string, params?: Partial<DateFilter>) {
        const queryParams = {
            machine_name: machine_name,
            ...params,
        };

        this.http
            .get(`${this.baseUrl}/get-download-excel-sanso-matic-all`, {
                responseType: 'arraybuffer',
                params: queryParams,
                observe: 'response'
            })
            .subscribe((response) => {
                const fileName = response.headers.get('x-download');
                downLoadFile(response.body, fileName);
            });
    }
}
