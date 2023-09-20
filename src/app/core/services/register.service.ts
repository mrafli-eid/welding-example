import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterLine, MasterMachine, MasterSubject } from '../models/master.model';
import { environment } from '../../../environments/environment';
import { removeEmptyObject } from '../helpers/object.helper';
import { HttpResponse } from '../models/http.model';
import { MachineLine, SubjectMachine } from "../models/register.model";
import { downLoadFile } from '../helpers/http.helper';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    baseUrl = `${ environment.API_URL }/api/activity`;

    constructor(private http: HttpClient) {
    }

    getSubjectList() {
        return this.http.get<HttpResponse<MasterSubject[]>>(`${ environment.API_URL }/api/subject/get-subject-all`);
    }

    getMachineList() {
        return this.http.get<HttpResponse<MasterMachine[]>>(`${ environment.API_URL }/api/machine/get-machine-all`);
    }

    getLineList() {
        return this.http.get<HttpResponse<MasterLine[]>>(`${ environment.API_URL }/api/line/get-line-all`);
    }

    getSubjectMachineList(params: Partial<any>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<SubjectMachine[]>>(`${ environment.API_URL }/api/machine/get-all-subject-machine`, {
            observe: 'response',
            params: params,
        });
    }

    createSubjectMachine(body: any) {
        return this.http.post<HttpResponse<any>>(`${ environment.API_URL }/api/subject/create-subject-machine`, body);
    }

    exportSubjectMachine() {
        this.http.get(`${ environment.API_URL }/api/machine/download-excel-subject-machine`, {
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    deleteSubjectMachine(id: string) {
        return this.http.delete<HttpResponse<any>>(`${ environment.API_URL }/api/subject/delete-subject-machine/${ id }`);
    }

    updateSubjectMachine(id: string, body: any) {
        return this.http.post<HttpResponse<any>>(`${ environment.API_URL }/api/subject/edit-subject-machine/${ id }`, body);
    }


    /** Machine Line **/

    getMachineLineList(params: Partial<any>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MachineLine[]>>(`${ environment.API_URL }/api/line/get-all-machine-line`, {
            observe: 'response',
            params: params,
        });
    }

    createMachineLine(body: any) {
        return this.http.post<HttpResponse<any>>(`${ environment.API_URL }/api/machine/create-machine-line`, body);
    }

    exportMachineLine() {
        this.http.get(`${ environment.API_URL }/api/line/download-excel-machine-line`, {
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    deleteMachineLine(id: string) {
        return this.http.delete<HttpResponse<any>>(`${ environment.API_URL }/api/machine/delete-machine-line/${ id }`);
    }

    updateMachineLine(id: string, body: any) {
        return this.http.post<HttpResponse<any>>(`${ environment.API_URL }/api/machine/edit-machine-line/${ id }`, body);
    }


}
