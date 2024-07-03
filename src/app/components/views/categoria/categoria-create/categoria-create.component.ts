import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrl: './categoria-create.component.css'
})
export class CategoriaCreateComponent {

  categoria: Categoria = {
    nome: '',
    descricao: '',
  }

  constructor(
    private service: CategoriaService,
    private router: Router
  ) {}

  create(): void {
    this.service.create(this.categoria).subscribe({
      next: () => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria criada com sucesso!');
      },
      error: (err) => {
        for (let i = 0; i < err.error.error.length; i++) {
          this.service.mensagem(err.error.errors[i].message);
        }
      },
    });
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
