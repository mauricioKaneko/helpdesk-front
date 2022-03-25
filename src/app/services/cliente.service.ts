import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findbyid(id:any):Observable<Cliente>{
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/api/clientes/${id}`);
  }

  findall():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/api/clientes`);

  }

  create(cliente:Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/api/clientes`, cliente)
  }

  update(cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/api/clientes/${cliente.id}`,cliente);

  }

  delete(id:any):Observable<Cliente>{
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/api/clientes/${id}`);
  }


}
