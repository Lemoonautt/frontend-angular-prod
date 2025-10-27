import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService, Categoria } from '../../services/categoria';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  loading = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.loading = true;
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.loading = false;
        console.log('Categorías cargadas:', categorias);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.loading = false;
        alert('Error al cargar categorías');
      }
    });
  }
}
