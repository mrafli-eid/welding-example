import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';
import { notification } from '../models/notification.model';
import {DetailMachineRpmSpindle, DetailMachineSansoMatic, DetailMachineRurgeCell, DetailMachineDewPoint, DetailMachineTemperatureMirror} from '../../core/models/machine.model'


@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    baseUrlDetailMachine = `${environment.API_URL}/api/detail-machine`;

    constructor(private http: HttpClient) {}

    getTempMirorMsg() {
        return this.http.get<HttpResponse<DetailMachineTemperatureMirror>>(
            `${this.baseUrlDetailMachine}/get-temp-mirror-all/LASER`
        );
    }

    getDewPointMsg() {
        return this.http.get<HttpResponse<DetailMachineDewPoint>>(
            `${this.baseUrlDetailMachine}/get-dew-point-all/LASER`
        );
    }

    getRurgeCellMsg() {
        return this.http.get<HttpResponse<DetailMachineRurgeCell>>(
            `${this.baseUrlDetailMachine}/get-rurge-cell-all/LASER`
        );
    }

    getSansoMaticMsg() {
        return this.http.get<HttpResponse<DetailMachineSansoMatic>>(
            `${this.baseUrlDetailMachine}/get-sanso-matic-all/LASER`
        );
    }
        getRpmSpindleMsg() {
        return this.http.get<HttpResponse<DetailMachineRpmSpindle>>(
            `${this.baseUrlDetailMachine}/get-rpm-spindle-all/LASER`
        );
    }
}
