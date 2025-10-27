import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  categoria_id?: number;
  categoria?: Categoria;
}

export interface Categoria{
  id?: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/productos';

  constructor(private http: HttpClient) { }

  createProducto(producto: Producto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(this.apiUrl, producto, { headers });
  }

  getProductos(): Observable<Producto[]> {
    // Agregar timestamp para evitar cache
    const timestamp = new Date().getTime();
    return this.http.get<Producto[]>(`${this.apiUrl}?t=${timestamp}`);
  }

  // deleteProducto(id: number): Observable<any> {
  // return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
