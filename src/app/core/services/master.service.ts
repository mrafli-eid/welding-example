import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterLine, MasterMachine, MasterParams, MasterRobot, MasterSubject } from '../models/master.model';
import { environment } from '../../../environments/environment';
import { removeEmptyObject } from '../helpers/object.helper';
import { HttpResponse } from '../models/http.model';
import { downLoadFile } from '../helpers/http.helper';

@Injectable({
    providedIn: 'root',
})
export class MasterService {

    baseUrlLine = `${ environment.API_URL }/api/line`;
    baseUrlMachine = `${ environment.API_URL }/api/machine`;
    baseUrlSubject = `${ environment.API_URL }/api/subject`;
    baseUrlRobot = `${ environment.API_URL }/api/robot`;

    constructor(private http: HttpClient) {
    }

    getLineList(params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MasterRobot[]>>(`${ this.baseUrlLine }/get-line-all`, {
            observe: 'response',
            params: params,
        });
    }

    createLine(body: any) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrlLine }/create-line`, body);
    }

    deleteLine(id: string) {
        return this.http.delete<HttpResponse<any>>(`${ this.baseUrlLine }/${ id }`);
    }

    updateLine(id: string, body: any) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrlLine }/${ id }`, body);
    }

    exportExcelLine() {
        this.http.get(`${ this.baseUrlLine }/download-excel-line`, {
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }


    getMachineList(params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MasterMachine[]>>(`${ this.baseUrlMachine }/get-machine-all`, {
            observe: 'response',
            params: params,
        });
    }

    createMachine(body: any) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrlMachine }/create-machine`, body);
    }

    deleteMachine(id: string) {
        return this.http.delete<HttpResponse<any>>(`${ this.baseUrlMachine }/${ id }`);
    }

    updateMachine(id: string, body: any) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrlMachine }/${ id }`, body);
    }

    exportExcelMachine() {
        this.http.get(`${ this.baseUrlMachine }/download-excel-machine`, {
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }


    getSubjectList(params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MasterSubject[]>>(`${ this.baseUrlSubject }/get-subject-all`, {
            observe: 'response',
            params: params,
        });
    }
    
    createSubject(body: any) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrlSubject }/create-subject`, body);
    }
    
    deleteSubject(id: string) {
        return this.http.delete<HttpResponse<any>>(`${ this.baseUrlSubject }/${ id }`);
    }
    
    updateSubject(id: string, body: any) {
        return this.http.post<HttpResponse<any>>(`${ this.baseUrlSubject }/${ id }`, body);
    }
    
    exportExcelSubject() {
        this.http.get(`${ this.baseUrlSubject }/download-excel-subject`, {
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }

    getListMachine() {
        return this.http.get<HttpResponse<MasterMachine[]>>(`${ environment.API_URL }/get-list-machine`);
    }
    
    createRobot(body: MasterRobot[]) {
        return this.http.post<HttpResponse<MasterRobot>>(`${ this.baseUrlRobot }/create-robot`, body);
    }
    
    getRobotList(params: Partial<MasterParams>) {
        params = removeEmptyObject(params);
        return this.http.get<HttpResponse<MasterRobot>>(`${ this.baseUrlRobot }/get-robot-all`, {
            observe: 'response',
            params: params,
        });
    }
    
    deleteRobot(id: string) {
        return this.http.delete<HttpResponse<MasterRobot>>(`${ this.baseUrlRobot }/${ id }`);
    }
    
    updateRobot(id: string, body: MasterRobot[]) {
        return this.http.put<HttpResponse<MasterRobot>>(`${ this.baseUrlRobot }/${ id }`, body);
    }

    exportExcelRobot() {
        this.http.get(`${ this.baseUrlRobot }/download-excel-robot`, {
            responseType: "arraybuffer",
        }).subscribe((response) => {
            downLoadFile(response);
        });
    }
}
