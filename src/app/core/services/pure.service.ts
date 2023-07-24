import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterMachine } from '../models/master.model';
import { environment } from '../../../environments/environment';
import { HttpResponse } from '../models/http.model';

@Injectable({
    providedIn: 'root',
})
export class PureService {

    constructor(private http: HttpClient) {
    }

    getMachineList() {
        return this.http.get<HttpResponse<MasterMachine[]>>(`${ environment.API_URL }/api/machine/get-list-machine`);
    }

}
