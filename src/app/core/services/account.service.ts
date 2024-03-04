import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) { }

  uploadImage(id_user: string, body: any) {
    return this.http.post<HttpResponse<any>>(`${environment.API_URL}/api/profile/${id_user}`, body)
  }

  deleteAccount(id_user: string) {
    return this.http.delete(`${environment.API_URL}/api/profile/${id_user}`)
  }

  getListAccount(id_user: string) {
    return this.http.get<HttpResponse<any>>(`${environment.API_URL}/api/profile/${id_user}`)
  }

  changePassword(body: any) {
    return this.http.post(`${environment.API_URL}/api/profile/change-pass`, body);
  }
}
