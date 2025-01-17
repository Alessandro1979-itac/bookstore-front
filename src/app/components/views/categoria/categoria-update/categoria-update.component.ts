import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrl: './categoria-update.component.css'
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta;
    })
  }

  update(): void {
    this.service.update(this.categoria).subscribe({
      next: () => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria atualizada com sucesso!');
      },
      error: () => {
        this.service.mensagem('Favor validar se todos os campos estão preenchidos corretamente.');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
