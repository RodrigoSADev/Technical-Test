import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IResponseProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  private apiUrl = 'http://rest-items.research.cloudonix.io/items';

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: IResponseProduct): Observable<IResponseProduct> {
    return this.http.post<IResponseProduct>(this.apiUrl, product);
  }

  updateProduct(product: IResponseProduct): Observable<IResponseProduct> {
    return this.http.patch<IResponseProduct>(
      `${this.apiUrl}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.apiUrl}/${id}`);
  }
}
