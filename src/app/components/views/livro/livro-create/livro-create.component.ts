import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrl: './livro-create.component.css'
})
export class LivroCreateComponent implements OnInit {

  id_cat: string = '';
  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: '',
  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(3)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe({
      next: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro criado com sucesso!');
      },
      error: () => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Erro ao criar novo livro. Tente mais tarde.');
      }
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo TITULO deve conter entre 3 e 100 caracteres.';
    }

    return false;
  }

  getMessageNomeAutor() {
    if (this.nome_autor.invalid) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres.';
    }

    return false;
  }

  getMessageText() {
    if (this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres.';
    }

    return false;
  }

}
