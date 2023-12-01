import { Injectable } from '@angular/core';
import { HttpResponse } from '../models/http.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductionPlanService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = `${environment.API_URL}/api`;

  getCalendarProductionGraph() {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}/set-plan-production/get-list-set-plan-calender`);
  }
}
