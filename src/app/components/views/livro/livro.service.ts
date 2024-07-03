import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Livro } from './livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseURL: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar,
  ) { }

  findAllByCategoria(id_cat: string): Observable<Livro[]> {
    const url = `${this.baseURL}/livros?categoria=${id_cat}`;

    return this.http.get<Livro[]>(url);
  }

  findById(id: string): Observable<Livro> {
    const url = `${this.baseURL}/livros/${id}`;

    return this.http.get<Livro>(url);
  }

  update(livro: Livro): Observable<Livro> {
    const url = `${this.baseURL}/livros/${livro.id}`;

    return this.http.put<Livro>(url, livro);
  }

  delete(id: string): Observable<void> {
    const url = `${this.baseURL}/livros/${id}`;

    return this.http.delete<void>(url);
  }

  create(livro: Livro, id_cat: string): Observable<Livro> {
    const url = `${this.baseURL}/livros?categoria=${id_cat}`;

    return this.http.post<Livro>(url, livro);
  }

  mensagem(str: string): void {
    this._snack.open(`${str}`, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
