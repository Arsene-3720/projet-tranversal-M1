// src/app/services/alertes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AlertesService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  createAlert(payload: any) {
    return this.http.post(`${this.base}/alerts`, payload);
  }

  sendToPolice(id: string | number) {
    return this.http.put(`${this.base}/alerts/${id}/send-to-police`, {});
  }
}
