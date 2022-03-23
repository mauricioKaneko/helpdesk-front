import { Tecnico } from './../models/tecnico';
import { Observable } from 'rxjs';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findbyid(id:any):Observable<Tecnico>{
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos/${id}`);
  }

  findall():Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/api/tecnicos`);

  }

  create(tecnico:Tecnico): Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos`, tecnico)
  }

  update(tecnico: Tecnico):Observable<Tecnico>{
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/api/tecnicos/${tecnico.id}`,tecnico);

  }

}
