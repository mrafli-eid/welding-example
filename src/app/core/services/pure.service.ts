import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterLine, MasterMachine, MasterSubject } from '../models/master.model';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';

@Injectable({
    providedIn: 'root',
})
export class PureService {

    constructor(private http: HttpClient) {
    }

    // getCategoryLineList() {
    //     return this.http.get<HttpResponse<MasterCategoryLine[]>>(`${ environment.API_URL }/api/category-line/get-list-category-line`);
    // }

    getMachineList() {
        return this.http.get<HttpResponse<MasterMachine[]>>(`${ environment.API_URL }/api/machine/get-list-machine`);
    }

    getLineList() {
        return this.http.get<HttpResponse<MasterLine[]>>(`${ environment.API_URL }/api/line/get-line-all`);
    }

    getSubjectList() {
        return this.http.get<HttpResponse<MasterSubject[]>>(`${ environment.API_URL }/api/subject/get-list-subject`);
    }
}
