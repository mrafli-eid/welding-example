import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpResponse } from "../models/http.model";
import { MasterMachine, MasterParams, MasterSubject } from "../models/master.model";
import { removeEmptyObject } from "../helpers/object.helper";
import { Setting, SettingUpsertRequest } from "../models/setting.model";
import { UserManagement } from '../models/user-management';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  baseUrl = `${environment.API_URL}/api}`

  constructor(private http: HttpClient) { }

  getUserManagementList(params: Partial<MasterParams> = null) {
    if (params) {
      params = removeEmptyObject(params);
    }
    return this.http.get<HttpResponse<UserManagement[]>>(`${this.baseUrl}/users`, {
      observe: 'response',
      params: params,
    });
  }

  createUserManagement(body: UserManagement) {
    return this.http.post<HttpResponse<null>>(`${this.baseUrl}/users`, body);
  }

  
}
