import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion?: string;
  activo?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CategoriaConProductos extends Categoria {
  productos_count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly apiUrl = `${environment.apiUrl}/categorias`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getCategorias(includeInactive: boolean = false): Observable<Categoria[]> {
    let params = new HttpParams();
    if (!includeInactive) {
      params = params.set('activo', 'true');
    }
    
    return this.http.get<Categoria[]>(this.apiUrl, {
      headers: this.httpOptions.headers,
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategoriasConProductos(): Observable<CategoriaConProductos[]> {
    return this.http.get<CategoriaConProductos[]>(`${this.apiUrl}/con-productos`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  patchCategoria(id: number, cambios: Partial<Categoria>): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.apiUrl}/${id}`, cambios, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  desactivarCategoria(id: number): Observable<Categoria> {
    return this.patchCategoria(id, { activo: false });
  }

  activarCategoria(id: number): Observable<Categoria> {
    return this.patchCategoria(id, { activo: true });
  }

  existeCategoria(nombre: string, excludeId?: number): Observable<boolean> {
    const params: any = { nombre };
    if (excludeId) {
      params.exclude_id = excludeId.toString();
    }

    return this.http.get<{ existe: boolean }>(`${this.apiUrl}/existe`, { params })
      .pipe(
        map(response => response.existe),
        catchError(() => throwError(() => new Error('Error al verificar categoría')))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.error(
        `Código de error: ${error.status}\n` +
        `Mensaje: ${error.message}\n` +
        `Detalles: ${JSON.stringify(error.error)}`
      );

      switch (error.status) {
        case 0:
          errorMessage = 'No se puede conectar con el servidor. Verifica tu conexión.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud inválida. Verifica los datos enviados.';
          break;
        case 401:
          errorMessage = 'No autorizado. Inicia sesión nuevamente.';
          break;
        case 403:
          errorMessage = 'No tienes permisos para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'Categoría no encontrada.';
          break;
        case 409:
          errorMessage = 'Ya existe una categoría con ese nombre.';
          break;
        case 422:
          errorMessage = error.error?.message || 'Error de validación en los datos.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intenta más tarde.';
          break;
        default:
          errorMessage = `Error del servidor: ${error.status}`;
      }
    }

    console.error('Error en CategoriaService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}