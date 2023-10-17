import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpResponse } from "../models/http.model";
import { MasterMachine, MasterParams, MasterSubject } from "../models/master.model";
import { removeEmptyObject } from "../helpers/object.helper";
import { Setting, SettingUpsertRequest } from "../models/setting.model";
import { ClaimTypeListUserManagement, PermissionListUserManagement, RoleList, RoleListUserManagement, UserListUserManagement } from '../models/user-management';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  baseUrl = `${environment.API_URL}/api`
  baseUrlUser = `${environment.API_URL}/api/users`
  baseUrlRole = `${environment.API_URL}/api/role`
  baseUrlPermission = `${environment.API_URL}/api/permission`

  constructor(private http: HttpClient) { }

  getRoleList(){
    return this.http.get<HttpResponse<RoleList[]>>(`${this.baseUrl}/permission/get-list-role`);
  }

  getListUser(params: Partial<MasterParams> = null) {
    if (params) {
      params = removeEmptyObject(params);
    }
    return this.http.get<HttpResponse<UserListUserManagement[]>>(`${this.baseUrl}/users`, {
      observe: 'response',
      params: params,
    });
  }

  createUser(body: any){
    return this.http.post<HttpResponse<any>>(`${this.baseUrlUser}`, body);
  }

  updateUser(id: string, body: any){
    return this.http.post<HttpResponse<any>>(`${this.baseUrlUser}/${ id }`, body);
  }

  deleteUser(id: string){
    return this.http.delete<HttpResponse<any>>(`${ this.baseUrlUser }/${ id }`);
  }

  // Role
  getListRole(params: Partial<MasterParams> = null) {
    if (params) {
      params = removeEmptyObject(params);
    }
    return this.http.get<HttpResponse<RoleListUserManagement[]>>(`${this.baseUrlRole}`, {
      observe: 'response',
      params: params,
    });
  }

  createRole(body: any){
    return this.http.post<HttpResponse<any>>(`${this.baseUrlRole}`, body);
  }

  updateRole(id: string, body: any){
    return this.http.post<HttpResponse<any>>(`${this.baseUrlRole}/${ id }`, body);
  }

  deleteRole(id: string){
    return this.http.delete<HttpResponse<any>>(`${ this.baseUrlRole }/${ id }`);
  }

  // Permissions
  getListPermission(params: Partial<MasterParams> = null) {
    if (params) {
      params = removeEmptyObject(params);
    }
    return this.http.get<HttpResponse<PermissionListUserManagement[]>>(`${this.baseUrlPermission}/get-list-permission`, {
      observe: 'response',
      params: params,
    });
  }

  getListClaimType() {
    return this.http.get<HttpResponse<ClaimTypeListUserManagement[]>>(`${this.baseUrlPermission}/get-list-claim-type`);
  }

  createPermission(body: any){
    return this.http.post<HttpResponse<any>>(`${this.baseUrlPermission}/create-permission`, body);
  }

  updatePermission(id: number, body: any){
    return this.http.post<HttpResponse<any>>(`${this.baseUrlPermission}/update-permission/${ id }`, body);
  }
  
  deletePermission(id: number){
    return this.http.delete<HttpResponse<any>>(`${ this.baseUrlPermission }/${ id }`);
  }
}
