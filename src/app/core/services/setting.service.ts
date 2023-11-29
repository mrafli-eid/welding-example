import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';
import {
    MasterMachine,
    MasterParams,
    MasterSubject,
} from '../models/master.model';
import { removeEmptyObject } from '../helpers/object.helper';
import { Setting, SettingUpsertRequest } from '../models/setting.model';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    baseUrl = `${environment.API_URL}/api/setting`;

    constructor(private http: HttpClient) {}

    getSettingList(params: Partial<MasterParams> = null) {
        if (params) {
            params = removeEmptyObject(params);
        }
        return this.http.get<HttpResponse<Setting[]>>(
            `${this.baseUrl}/get-setting-all`,
            {
                observe: 'response',
                params: params,
            }
        );
    }

    createSetting(body: SettingUpsertRequest) {
        return this.http.post<HttpResponse<null>>(
            `${this.baseUrl}/create-setting`,
            body
        );
    }

    getSubjectList() {
        return this.http.get<HttpResponse<MasterSubject[]>>(
            `${environment.API_URL}/api/subject/get-list-subject`
        );
    }

    getMachineList() {
        return this.http.get<HttpResponse<MasterMachine[]>>(
            `${environment.API_URL}/api/machine/get-list-machine`
        );
    }
}
