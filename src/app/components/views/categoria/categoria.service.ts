import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseURL: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar,
  ) { }

  findAll(): Observable<Categoria[]> {
    const url = `${this.baseURL}/categorias`;

    return this.http.get<Categoria[]>(url);
  }

  findById(id: string): Observable<Categoria> {
    const url = `${this.baseURL}/categorias/${id}`;

    return this.http.get<Categoria>(url);
  }

  create(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseURL}/categorias`;

    return this.http.post<Categoria>(url, categoria);
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseURL}/categorias/${id}`;

    return this.http.delete<void>(url);
  }

  update(categoria: Categoria): Observable<void> {
    const url = `${this.baseURL}/categorias/${categoria.id}`;

    return this.http.put<void>(url, categoria);
  }

  mensagem(str: string): void {
    this._snack.open(`${str}`, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
