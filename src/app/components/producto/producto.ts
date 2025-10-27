import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService, Producto } from '../../services/product';
import { CategoriaService, Categoria } from '../../services/categoria';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ProductoComponent implements OnInit {
  producto: Producto = {
    nombre: '',
    precio: 0,
    categoria_id: undefined
  };

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  submitted = false;
  loading = false;
  loadingList = false;
  loadingCategorias = false;

  constructor(
    private productService: ProductService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  // Cargar la lista de productos
  cargarProductos() {
    this.loadingList = true;
    this.productService.getProductos().subscribe({
      next: (productos) => {
        console.log('Productos recibidos:', productos);
        this.productos = productos.map(prod => ({
          ...prod,
          precio: Number(prod.precio)
        }));
        this.loadingList = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.loadingList = false;
      }
    });
  }

  // Cargar categorías para el selector
  cargarCategorias() {
    this.loadingCategorias = true;
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.loadingCategorias = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.loadingCategorias = false;
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.submitted = false;

    console.log('Enviando producto:', this.producto);

    this.productService.createProducto(this.producto).subscribe({
      next: (response) => {
        this.loading = false;
        this.submitted = true;

        console.log('✅ Respuesta del servidor:', response);

        alert('✅ Producto creado exitosamente!');

        // Limpiar el formulario después de éxito
        this.producto = { nombre: '', precio: 0, categoria_id: undefined };

        // Recargar la lista de productos
        this.cargarProductos();
      },
      error: (error) => {
        this.loading = false;
        console.error('❌ Error al crear producto:', error);

        alert('❌ Error al crear el producto. Verifica que el backend esté funcionando.');
      }
    });
  }

  // Formatear precio para mostrar
  formatearPrecio(precio: any): string {
    const precioNumero = Number(precio);
    if (isNaN(precioNumero)) {
      return '$0.00';
    }
    return `$${precioNumero.toFixed(2)}`;
  }
}
