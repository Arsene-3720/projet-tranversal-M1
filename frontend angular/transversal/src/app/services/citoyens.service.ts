// src/app/services/citoyens.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Citoyen } from '../models/citoyen';

@Injectable({ providedIn: 'root' })
export class CitoyensService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  list(): Observable<Citoyen[]> {
    return this.http.get<Citoyen[]>(`${this.base}/citoyens`);
  }

  getById(id: string | number): Observable<Citoyen> {
    return this.http.get<Citoyen>(`${this.base}/citoyens/${id}`);
  }

  update(id: string | number, payload: Partial<Citoyen>) {
    return this.http.put(`${this.base}/citoyens/${id}`, payload);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.base}/citoyens/${id}`);
  }

  // Méthodes UML protégées
  peutSignaler(id: string | number) {
    return this.http.get(`${this.base}/citoyens/${id}/peut-signaler`);
  }

  consulterCarte(id: string | number) {
    return this.http.get(`${this.base}/citoyens/${id}/consulter-carte`);
  }
}
